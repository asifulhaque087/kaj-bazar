# Kaj-Bazar — Backend Architecture & Engineering Deep-Dive

> How a 10-microservice NestJS monorepo solves the problems behind a freelance marketplace: gRPC
> service mesh with unified auth, double-auth-layer gateway-to-microservice verification, silent
> token rotation without client cooperation, cross-instance real-time chat via Redis pub/sub,
> transactional nested-resource upserts, and event-driven email delivery without blocking the
> request path.

**Stack:** NestJS · PostgreSQL + Drizzle ORM · Redis (ioredis) · RabbitMQ (amqplib) · gRPC
(ts-proto) · Socket.IO · Turborepo.

---

## Table of Contents

1. [Two-Layer gRPC Service Mesh Authentication — GatewayToken + User JWT](#1-two-layer-grpc-service-mesh-authentication--gatewaytoken--user-jwt)
2. [Silent Token Rotation Without Client Cooperation](#2-silent-token-rotation-without-client-cooperation)
3. [WebSocket-to-gRPC Streaming Bridge — Chat Real-Time Architecture](#3-websocket-to-grpc-streaming-bridge--chat-real-time-architecture)
4. [Cross-Instance Chat Broadcasting — Redis Pub/Sub as a Service Bus](#4-cross-instance-chat-broadcasting--redis-pubsub-as-a-service-bus)
5. [Transactional Nested-Resource Upsert — Seller Profile with 6 Sub-Tables](#5-transactional-nested-resource-upsert--seller-profile-with-6-sub-tables)
6. [Event-Driven User Creation and Email Delivery via RabbitMQ](#6-event-driven-user-creation-and-email-delivery-via-rabbitmq)
7. [Proto Path Resolution Across 5 Runtime Contexts](#7-proto-path-resolution-across-5-runtime-contexts)
8. [gRPC Error Propagation — Structured Error Mapping Across Transport Boundaries](#8-grpc-error-propagation--structured-error-mapping-across-transport-boundaries)
9. [Hybrid-Transport Microservice — User Service as gRPC Server + RabbitMQ Consumer](#9-hybrid-transport-microservice--user-service-as-grpc-server--rabbitmq-consumer)
10. [Database-Per-Service Isolation with Shared Drizzle Module](#10-database-per-service-isolation-with-shared-drizzle-module)
11. [Failure Tolerance & Degradation](#11-failure-tolerance--degradation)
12. [Module Map & Data Stores](#12-module-map--data-stores)

---

## 1. Two-Layer gRPC Service Mesh Authentication — GatewayToken + User JWT

**The problem.** The gateway proxies every client request to backend microservices via gRPC. Two
independent trust boundaries exist: (1) the microservice must know the request came from the
*gateway itself* (not a rogue client connecting directly to the gRPC port), and (2) the
microservice needs the end-user's identity for authorization. A single token can't express both.

**The solution — two distinct JWTs carried in separate gRPC metadata keys.** Every outbound gRPC
call from the gateway receives a `gatewaytoken` via a gRPC channel interceptor, and guarded
endpoints additionally forward the user's `Bearer` token as `authorization` metadata.

### Layer 1: Gateway-to-Microservice auth — `gatewaytoken`

A custom gRPC interceptor signs a JWT `{ serviceName }` with the per-microservice secret and
injects it into every outgoing call's metadata:

```ts
// apps/gateway/src/grpc.interceptor.ts — lines 9-23
export const createModuleAuthInterceptor = (serviceName: string, secret: string) => {
  return (options, nextCall) => new InterceptingCall(nextCall(options), {
    start: (metadata, listener, next) => {
      const token = jwt.sign({ serviceName }, secret);
      metadata.add('gatewaytoken', token);
      next(metadata, listener);
    },
  });
};
```

Each feature module registers its gRPC client with the interceptor:

```ts
// apps/gateway/src/auth/auth.module.ts — lines 27-69
ClientsModule.registerAsync([{
  name: 'AUTH_SERVICE',
  transport: Transport.GRPC,
  options: {
    url: config.get('AUTH_GRPC_URL'),
    package: AUTH_PACKAGE_NAME,
    protoPath: getProtoPath('auth.proto'),
    channelOptions: {
      interceptors: [createModuleAuthInterceptor('auth', config.get('AUTH_GATEWAY_SECRET'))],
    },
  },
}]);
```

Every microservice registers `GatewayGuard` as a global `APP_GUARD`. It extracts the
`gatewaytoken` from gRPC metadata, verifies it against the service's secret, and checks the
`serviceName` claim:

```ts
// packages/common/src/guards/gateway.guard.ts — lines 12-36
@Injectable()
export class GatewayGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const metadata = context.switchToRpc().getContext();
    if (!metadata) return false;
    const token = metadata.get('gatewaytoken')[0] as string;
    const payload = jwt.verify(token, this.gatewaySecret) as { serviceName: string };
    return payload.serviceName === this.expectedService;
  }
}
```

**Why this matters**: Without it, any process that can reach the microservice's gRPC port could
call any RPC. The interceptor + guard pair is a mutual TLS equivalent without PKI — the gateway
proves its identity with a shared-secret JWT on every call.

### Layer 2: End-user auth — `authorization` Bearer token

For RPCs that need the caller's identity (like `whoAmI`, `changePassword`, `currentBuyer`),
the gateway passes the user's JWT as a standard `authorization` metadata header:

```ts
// apps/gateway/src/utils/create-auth-metadata.util.ts — lines 5-10
export const createAuthMetadata = (bearerToken: string): Metadata => {
  const metadata = new Metadata();
  metadata.add('authorization', bearerToken);
  return metadata;
};
```

On the microservice side, `GrpcGuard` verifies this JWT and injects the decoded payload into
the request data:

```ts
// packages/common/src/guards/grpc.guard.ts — lines 19-52
@Injectable()
export class GrpcGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = context.switchToRpc().getContext();
    const authHeader = metadata.get('authorization')?.[0] as string;
    if (!authHeader?.startsWith('Bearer ')) throwGrpcError('UNAUTHENTICATED', ...);
    const token = authHeader.split(' ')[1];
    const [payload, err] = await tryit(this.jwtService.verifyAsync(token));
    if (err) throwGrpcError('UNAUTHENTICATED', 'Token verification failed');
    const data = rpcContext.getData();
    data.user = payload;  // injected for downstream use
    return true;
  }
}
```

Applied per-endpoint via `@UseGuards(GrpcGuard)` in controllers:

```ts
// apps/auth/src/auth.controller.ts — line 63
@UseGuards(GrpcGuard)
async changePassword(@GrpcStreamMethod() request: ...) { ... }
```

**The two layers compose:**
```
Client → gatewaytoken + authorization → GatewayGuard + GrpcGuard → handler
                (layer 1)                (layer 2)
```

If the gatewaytoken is missing or invalid, the guard rejects before the handler ever runs. If
valid, the user JWT is decoded and made available — so an RPC knows *who called* and *who sent
them*.

### Per-service secrets — each microservice gets its own

| Microservice | Env Secret | Expected serviceName |
|---|---|---|
| Auth | `AUTH_GATEWAY_SECRET` | `auth` |
| User | `USER_GATEWAY_SECRET` | `user` |
| Gig | `GIG_GATEWAY_SECRET` | `gig` |
| Chat | `CHAT_GATEWAY_SECRET` | `chat` |

This prevents a compromised `gatewaytoken` for one service from being replayed against another.

---

## 2. Silent Token Rotation Without Client Cooperation

**The problem.** Access tokens expire (short-lived for security, e.g. 15 min). The classic solution
is a `/auth/refresh` endpoint the client calls proactively. But this requires the client to track
token expiry, retry on 401, and coordinate a refresh dance — logic that must be replicated in
every client (web, mobile, API consumers).

**The solution — the guard itself becomes a transparent refresh proxy.** The `AccessTokenGuard`
reads the `accessToken` from an httpOnly cookie, checks expiry locally *before* Passport runs,
and if expired, calls the auth microservice's `refreshAccessToken` RPC using the `refreshToken`
cookie, sets new cookies on the *same* response, and injects the new Bearer token into headers
before `super.canActivate()` runs:

```ts
// apps/gateway/src/guards/access-token.guard.ts — lines 21-66
async canActivate(context: ExecutionContext): Promise<boolean> {
  let accessToken = request.cookies['accessToken'];

  if (!accessToken || this.authService.isTokenExpired(accessToken, accessSecret)) {
    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) throw new UnauthorizedException();
    if (this.authService.isTokenExpired(refreshToken, refreshSecret))
      throw new UnauthorizedException();

    // Transparent refresh via gRPC
    const { newAccessToken, newRefreshToken } =
      await this.authService.refreshAccessToken({ token: refreshToken });

    // Set new httpOnly cookies
    response.cookie('accessToken', newAccessToken, cookieSettings.access.options);
    response.cookie('refreshToken', newRefreshToken, cookieSettings.refresh.options);

    // Inject for downstream Passport strategy
    request.headers['authorization'] = `Bearer ${newAccessToken}`;
  }

  return super.canActivate(context) as boolean;
}
```

**Three things happen before the controller runs:**
1. **Cookie read** — both tokens extracted from httpOnly cookies (inaccessible to JavaScript)
2. **Local expiry check** — `isTokenExpired` uses `jwt.verify()` with a try/catch (no RPC needed
   for the common case where the access token is still valid)
3. **gRPC refresh** — only when the access token is actually stale; new tokens written as cookies
   on the same response, and the new access token injected into `request.headers.authorization` for
   Passport's `JwtStrategy` to validate

**The client never knows a refresh happened.** The response arrives with new cookies, but the
client's fetch/XHR flow is unchanged — no 401 retry, no explicit refresh call, no token state
management. The httpOnly cookie is updated transparently on any request that triggers a refresh.

**Refresh token storage enables revocation.** The auth microservice stores `refreshToken` in the
DB on `generateTokens` and looks it up on `refreshAccessToken`:

```ts
// apps/auth/src/auth.service.ts — lines 435-467
async refreshAccessToken(data: RefreshAccessTokenDto) {
  const [user] = await this.db.select().from(AuthTable)
    .where(eq(AuthTable.refreshToken, data.token)).limit(1).then(r => r[0]);
  if (!user) throwGrpcError('UNAUTHENTICATED', 'Unauthorized access');
  const newTokens = await this.generateTokens(user.id, user.email);
  return { newAccessToken: newTokens.accessToken, newRefreshToken: newTokens.refreshToken };
}
```

If a refresh token is compromised, clearing it from the DB immediately revokes all sessions using
it — the next refresh attempt finds no match and rejects.

---

## 3. WebSocket-to-gRPC Streaming Bridge — Chat Real-Time Architecture

**The problem.** Real-time chat needs persistent bidirectional communication. The client speaks
WebSocket (Socket.IO), but the chat backend exposes a gRPC interface. Bridging the two means
maintaining long-lived server-streaming gRPC calls and mapping them to individual WebSocket
connections, with cleanup when either side disconnects.

**The solution — a lifecycle-managed bridge in the gateway.** `ChatGateway` opens a persistent
gRPC `server-streaming` call per WebSocket connection and forwards every received message to the
WS client. Sends go through unary gRPC.

### Connection lifecycle

```ts
// apps/gateway/src/chat/chat.gateway.ts — lines 44-82
async handleConnection(client: Socket) {
  const username = client.handshake.query.username as string;
  if (!username) { client.disconnect(); return; }

  // Open persistent gRPC server-stream to chat microservice
  const grpcStream = this.chatService.streamMessages({ username });
  const subscription = grpcStream.subscribe({
    next: (message) => client.emit('messageReceived', message),
    error: (err) => console.error(`gRPC Stream Error for ${username}:`, err),
    complete: () => console.log(`gRPC Stream for ${username} closed by remote.`),
  });

  this.activeStreams.set(client.id, subscription);
}

handleDisconnect(client: Socket) {
  const stream = this.activeStreams.get(client.id);
  if (stream) {
    stream.unsubscribe();
    this.activeStreams.delete(client.id);
  }
}
```

**Sending messages** goes through a separate unary gRPC call, so the streaming bridge is
receive-only — clean separation of concerns:

```ts
// chat.gateway.ts — lines 84-100
@SubscribeMessage('sendMessage')
async handleSendMessage(client: Socket, payload: CreateMessageRequest) {
  const savedMessage = await firstValueFrom(this.chatService.createMessage(payload));
  return { status: 'OK', message: savedMessage };
}
```

### Memory leak prevention

Every gRPC stream creates an RxJS `Subscription` that holds references to both the socket and the
observable. Without tracking, a disconnect would orphan the subscription — the gRPC stream stays
open, the `next` handler continues firing, and the client is gone. The `activeStreams` Map
(`Map<string, Subscription>`) keyed by `client.id` ensures every `handleDisconnect` cleans its
matching stream.

```
WebSocket connect → gRPC streamMessages() called → subscription stored in Map
WebSocket disconnect → subscription.unsubscribe() → Map entry deleted
```

The `streamMessages` gRPC handler in the chat service also cleans up its Redis listener on
unsubscription (see §4), so both ends of the bridge are leak-free.

### No authentication on WS connect

The gateway extracts `username` from `client.handshake.query` without JWT verification. This is a
known trade-off: chat identity is self-declared via the handshake query parameter. The
`receiverUsername` filter in the chat service (see §4) ensures users only receive messages
intended for them, but there's no gate preventing user A from connecting as user B. A production
upgrade would validate the WebSocket connection against the JWT cookie.

---

## 4. Cross-Instance Chat Broadcasting — Redis Pub/Sub as a Service Bus

**The problem.** A single chat service instance works with an in-memory `Subject` (the
commented-out code in `chat.service.ts` lines 176-289). But with multiple instances behind a load
balancer, a message published on instance 1 never reaches clients connected to instance 2.
Messages write to PostgreSQL on one instance, but streaming listeners on other instances never see
them.

**The solution — Redis Pub/Sub as the cross-instance message bus.** Every `createMessage` call
publishes the saved message to a Redis channel. Every `streamMessages` subscription listens on
that channel. This decouples message production from consumption entirely:

```ts
// apps/chat/src/chat.service.ts — lines 36-105
async createMessage(data: CreateMessageDto) {
  const [message] = await tryit(
    this.db.insert(MessagesTable).values(messageData).returning()
      .then(res => ({ ...res[0], createdAt: res[0].createdAt.toISOString() })),
  );
  // Publish to Redis so all instances see it
  await this.redisPublisher.publish(CHAT_CHANNEL, JSON.stringify(message));
  return message;
}

streamMessages(username: string): Observable<MessageResponse> {
  return new Observable<MessageResponse>(subscriber => {
    const handleMessage = (channel: string, messageStr: string) => {
      if (channel !== CHAT_CHANNEL) return;
      subscriber.next(JSON.parse(messageStr));
    };
    this.redisSubscriber.on('message', handleMessage);
    // Cleanup on unsubscription (gRPC stream close)
    return () => this.redisSubscriber.off('message', handleMessage);
  }).pipe(
    filter(message => message.receiverUsername === username),
  );
}
```

### Why two Redis connections?

```ts
// apps/chat/src/redis/redis.module.ts — lines 1-19
@Global()
@Module({
  providers: [
    { provide: REDIS_PUBLISHER, useFactory: () => new Redis({ host: REDIS_HOST }) },
    { provide: REDIS_SUBSCRIBER, useFactory: () => new Redis({ host: REDIS_HOST }) },
  ],
  exports: [REDIS_PUBLISHER, REDIS_SUBSCRIBER],
})
export class RedisModule {}
```

A Redis connection in subscriber mode cannot execute regular commands. Two connections are
required: one for publishing (normal mode) and one for subscribing (subscriber mode). The
module subscribes to `chat:messages` on startup (`onModuleInit`):

```ts
async onModuleInit() {
  await this.redisSubscriber.subscribe(CHAT_CHANNEL);
}
```

### Message flow across instances

```
Instance 1: Client A sends message
  → INSERT into chat-db PostgreSQL
  → PUBLISH to Redis channel 'chat:messages'

Instance 2: Redis SUBSCRIBER picks up the message
  → Observable emits to all active gRPC streams
  → Each stream filters by receiverUsername
  → Gateway forwards to matching WebSocket clients

Instance 3 (chat microservice): Same as Instance 2 — every instance sees the message
```

The pub/sub channel operates at the Redis layer, not RabbitMQ, because chat messages need
sub-millisecond delivery to maintain real-time feel. RabbitMQ would add serialization,
queueing, and acknowledgment overhead that isn't needed here (chat messages are ephemeral for
broadcast; durability comes from PostgreSQL).

---

## 5. Transactional Nested-Resource Upsert — Seller Profile with 6 Sub-Tables

**The problem.** A seller profile is a single `sellers` row with 6 associated sub-tables
(languages, skills, experiences, educations, social links, certificates). The update API receives
the full state: some records added, some modified, some deleted (identified by client-provided
`removedXxxIds` arrays). Without a transaction, a partial failure leaves the profile in an
inconsistent state — half the deletions applied, half the additions missing.

**The solution — a single Drizzle transaction with a delete-then-upsert pattern.** The update
handler runs inside `this.db.transaction(...)`, which auto-rolls back on any rejection:

```ts
// apps/user/src/seller/seller.service.ts — lines 203-478
async update(formData: UpdateSellerDto) {
  const [result, err] = await tryit(
    this.db.transaction(async (tx) => {
      // 1. Update main seller fields
      await tx.update(SellersTable).set({ fullName, description, oneliner })
        .where(eq(SellersTable.id, formData.id));

      // 2. Delete removed records in one shot per type
      await tx.delete(LanguagesTable)
        .where(inArray(LanguagesTable.id, formData.removedLangIds.map(o => o.id)));

      // 3. Upsert remaining — new (id === '') gets inserted, existing gets updated
      const languagesToUpsert = formData.languages.map(lang => ({
        id: lang.id === '' ? undefined : lang.id,
        sellerId: formData.id,
        language: lang.language,
        level: lang.level,
      }));
      if (languagesToUpsert.length > 0) {
        await tx.insert(LanguagesTable).values(languagesToUpsert)
          .onConflictDoUpdate({
            target: LanguagesTable.id,
            set: { language: sql`excluded.language`, level: sql`excluded.level` },
          });
      }
      // ... same pattern for skills, experiences, educations, social links, certificates

      // 4. Return fully hydrated seller
      return tx.query.SellersTable.findFirst({
        where: eq(SellersTable.id, formData.id),
        with: { languages: true, skills: true, experience: true,
                education: true, socialLinks: true, certificates: true },
      });
    }),
  );
  if (err) throwGrpcError('INTERNAL', err.message);
  return result;
}
```

### The upsert trick

New records arrive with `id: ''` — the empty string signals "insert me." Existing records arrive
with their real UUID — `onConflictDoUpdate` targets `LanguagesTable.id` and updates columns via
PostgreSQL's `EXCLUDED` pseudo-row:

```sql
INSERT INTO languages (...) VALUES (...)
ON CONFLICT (id) DO UPDATE SET language = EXCLUDED.language, level = EXCLUDED.level;
```

This is driven by Drizzle's `sql`\`excluded.column\`` — a raw SQL escape hatch that maps the
column name with snake_case conversion (`excluded.start_date`, `excluded.end_date`,
`excluded.currently_working_here` in the experiences section, lines 333-335).

### Atomicity guarantee

If any step fails (e.g. a foreign key violation on `sellerId`, a UNIQUE constraint on `username`
in the main seller update), the transaction rolls back everything — partial deletions are undone,
partial inserts never committed. The client receives a gRPC `INTERNAL` error and retries with the
original (untouched) state.

The `create` method uses the same transaction pattern (lines 74-201), also updating
`BuyersTable.isSeller = true` atomically within the same transaction — so a buyer is never
marked as a seller without a complete profile.

---

## 6. Event-Driven User Creation and Email Delivery via RabbitMQ

**The problem.** When a user registers, three things must happen: (1) create the auth record,
(2) create a buyer profile in the user service, (3) send a verification email. If (2) or (3) are
synchronous gRPC calls, a failure in the email service (e.g. SMTP timeout) blocks the entire
registration response. The user gets a "500 Internal Server Error" even though their account was
successfully created.

**The solution — fire-and-forget RabbitMQ events after the DB write commits.** The auth service
emits two messages on two separate queues after the auth record is inserted and tokens are
generated:

```ts
// apps/auth/src/auth.service.ts — lines 85-96
// 1. Notify user service to create buyer record
this.userRabbitClient.emit('user-created', buyerData);

// 2. Notify email service to send verification email
this.emailRabbitClient.emit('send-email', {
  subject: 'Verify Your Email',
  receiver: newUser.email!,
  verifyLink: verificationLink,
  templateName: 'verifyEmail',
  username: newUser.username,
});
```

### Queue topology

```
AuthService (RabbitMQ producer)
    │
    ├── queue: email-queue, event: send-email
    │       └── EmailController (consumer) — @EventPattern('send-email')
    │               → mailerService.sendMail() with EJS template
    │
    └── queue: user-queue, event: user-created
            └── BuyerController (consumer) — @EventPattern('user-created')
                    → buyerService.create() → INSERT into BuyersTable
```

### Consumer: Email service

The email microservice is a RabbitMQ-only consumer — no gRPC, no HTTP. It sends emails via
`@nestjs-modules/mailer` with EJS templates stored in `src/templates/`:

```ts
// apps/email/src/email.service.ts — lines 18-57
async sendEmail(data: SendEmailEventDto) {
  const [result, error] = await tryit(
    this.mailerService.sendMail({
      to: data.receiver,
      subject: data.subject,
      template: `./${data.templateName}`,
      context: { appLink, appIcon, username, verifyLink, resetLink, otp },
    }),
  );
  if (error) console.error('Failed to send email:', error.message);
  // Swallow — email failure doesn't fail the request
}
```

**Emails never fail the request.** The `tryit` catches and logs SMTP errors but never throws. If
ethereal.email is down, the user still gets their account and tokens — the email will be retried
at the infrastructure level (RabbitMQ auto-requeue on disconnect).

### Consumer: User service (hybrid transport setup)

The user microservice uses a **hybrid** NestJS bootstrap: it creates an HTTP app (for the base
NestJS platform) and then attaches *two* microservices — one gRPC (for synchronous queries), one
RabbitMQ (for event consumption):

```ts
// apps/user/src/main.ts — lines 15-29
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: { package: USER_PACKAGE_NAME, protoPath: getProtoPath('user.proto'), ... },
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: { urls: [config.get('RABBITMQ_URL')], queue: 'user-queue', ... },
  });
  await app.startAllMicroservices();
}
```

The `BuyerController` listens for the event:

```ts
// apps/user/src/buyer/buyer.controller.ts — line 39
@EventPattern('user-created')
async registerBuyer(data: RegisterBuyerDto) {
  await this.buyerService.create(data);
}
```

---

## 7. Proto Path Resolution Across 5 Runtime Contexts

**The problem.** Proto files are needed at runtime in `ClientsModule.registerAsync` and
microservice options. But the working directory differs: `ts-node` runs from the app's `src/`
directory, the compiled `dist/` has protos copied beside the JS bundle, Docker containers have a
different `CWD` entirely, and webpack bundles embed the proto as a string.

**The solution — `getProtoPath()` searches 5 candidate directories in order** and walks up the
directory tree as a fallback:

```ts
// packages/common/src/protos/index.ts — lines 1-35
export const getProtoPath = (filename: string): string => {
  const candidates = [
    path.join(__dirname, 'protos', filename),         // dist/protos/ (compiled)
    path.join(__dirname, filename),                    // same dir
    path.join(__dirname, '../protos', filename),       // dev: src/protos/
    path.join(__dirname, '../../protos', filename),    // monorepo structure
    path.join(process.cwd(), 'protos', filename),      // fallback to CWD
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  // Walk up to find proto in monorepo
  const findUp = (dir: string): string => {
    const probe = path.join(dir, 'protos', 'auth.proto');
    if (fs.existsSync(probe)) return path.join(dir, 'protos', filename);
    const parent = path.dirname(dir);
    if (parent === dir) throw new Error(`Proto ${filename} not found`);
    return findUp(parent);
  };
  return findUp(process.cwd());
};
```

---

## 8. gRPC Error Propagation — Structured Error Mapping Across Transport Boundaries

**The problem.** A microservice throws a gRPC `RpcException` with `INVALID_ARGUMENT`. The gateway
needs to convert this to an HTTP 400 with a structured JSON body. But gRPC exceptions are opaque
to NestJS's HTTP layer — the filter must distinguish gRPC errors from regular HTTP exceptions,
parse the metadata, and map status codes.

**The solution — a global exception filter that detects gRPC errors via a custom metadata flag.**
Every microservice error includes `{ 'is-grpc-exception': 'true' }` in gRPC metadata:

```ts
// packages/common/src/utils/throw-rpc-err.util.ts — lines 5-17
export const throwGrpcError = (statusName: keyof typeof grpc.status, message: string) => {
  const metadata = new Metadata();
  metadata.add('is-grpc-exception', 'true');
  throw new RpcException({
    code: grpc.status[statusName],
    message,
    metadata,
  });
};
```

The gateway's `RpcToHttpFilter` catches all exceptions:

```ts
// apps/gateway/src/filters/rpc-to-http.filter.ts — lines 18-56
@Catch()
export class RpcToHttpFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const isGrpc = exception?.metadata?.get('is-grpc-exception')?.[0] === 'true';
    if (isGrpc) {
      const grpcCode = exception.code || grpc.status.INTERNAL;
      const httpStatus = GrpcErrorMapper.mapStatus(grpcCode);
      const details = GrpcErrorMapper.prepareDetails(exception.message);
      const displayMsg = GrpcErrorMapper.prepareMessage(exception.message);
      response.status(httpStatus).json({ errors: details.length ? details : [{ message: displayMsg }] });
    } else {
      // Pass through non-gRPC exceptions (e.g. regular HTTP errors from guards)
    }
  }
}
```

### Status code mapping

| gRPC Status | HTTP Status | When |
|---|---|---|
| `INVALID_ARGUMENT` | 400 | Validation errors, bad credentials |
| `UNAUTHENTICATED` | 401 | Missing/expired token |
| `PERMISSION_DENIED` | 403 | Gateway token wrong service |
| `NOT_FOUND` | 404 | User/conversation not found |
| `ALREADY_EXISTS` | 409 | Duplicate email during registration |
| `UNAVAILABLE` | 503 | gRPC channel down |
| `INTERNAL` | 500 | DB errors, unexpected failures |

Validation errors (from `GrpcValidationPipe`) are serialized as a JSON array of `{field,
message}` objects in the gRPC exception message. The filter deserializes them and returns the
same structure in the HTTP response:

```json
{
  "errors": [
    { "field": "email", "message": "email must be a valid email address" },
    { "field": "password", "message": "password must be at least 8 characters" }
  ]
}
```

---

## 9. Hybrid-Transport Microservice — User Service as gRPC Server + RabbitMQ Consumer

**The problem.** The user service must answer synchronous gRPC queries (find buyer by ID,
find seller by username) AND consume RabbitMQ events (create buyer on registration). NestJS
microservices are typically single-transport, but this service needs both simultaneously.

**The solution — `NestFactory.create` + `connectMicroservice` twice.** The user service boots
as an HTTP application (required by NestJS as the primary context) and attaches two independent
transport layers:

```ts
// apps/user/src/main.ts — lines 15-29
const app = await NestFactory.create(AppModule);

app.connectMicroservice({
  transport: Transport.GRPC,
  options: {
    package: USER_PACKAGE_NAME,
    protoPath: getProtoPath('user.proto'),
    url: `0.0.0.0:${GRPC_PORT || '50051'}`,
  },
});

app.connectMicroservice({
  transport: Transport.RMQ,
  options: {
    urls: [config.get('RABBITMQ_URL')],
    queue: 'user-queue',
    queueOptions: { durable: true },
    noAck: false,
  },
});

await app.startAllMicroservices();
```

The same `AppModule` hosts both transports. The `BuyerController` handles gRPC calls, while
`buyer.controller.ts` has a separate method for RabbitMQ:

```ts
// apps/user/src/buyer/buyer.controller.ts — line 39
@EventPattern('user-created')
async registerBuyer(data: RegisterBuyerDto) {
  await this.buyerService.create(data);
}
```

**Why this pattern matters**: Without hybrid transport setup, you'd need a separate "user-event"
microservice just to consume RabbitMQ events, duplicating the DB connection, schema, and
business logic. NestJS's `startAllMicroservices` lets one process listen on both transports
simultaneously.

This is also how the auth service works for RabbitMQ emission — it's a gRPC server that also
holds `ClientProxy` references for RabbitMQ. The difference is the user service *receives* on
RabbitMQ (consumer), while auth *sends* (producer).

---

## 10. Database-Per-Service Isolation with Shared Drizzle Module

**The problem.** Four microservices need databases (auth, user, gig, chat). Each must have its own
schema (domain isolation, independent migrations) but they all share the same Drizzle
initialization boilerplate. Copying the module logic across 4 apps is error-prone.

**The solution — a configurable `DrizzleModule` that accepts schema + connection string.** The
shared `@app/common` package provides a `ConfigurableModuleBuilder`-based module:

```ts
// packages/common/src/database/drizzle.module-definition.ts — lines 1-8
export interface DrizzleOptions {
  connectionString: string;
  schema: Record<string, unknown>;
}
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DrizzleOptions>().build();
```

The module creates a PostgreSQL pool and Drizzle instance once, exporting the `DRIZZLE` token:

```ts
// packages/common/src/database/drizzle.module.ts — lines 11-26
@Global()
export class DrizzleModule extends ConfigurableModuleClass {
  static registerAsync(options: ...): DynamicModule {
    return {
      global: true,
      module: DrizzleModule,
      providers: [
        {
          provide: DRIZZLE,
          useFactory: (opts: DrizzleOptions) => {
            const pool = new Pool({ connectionString: opts.connectionString });
            return drizzle(pool, { schema: opts.schema });
          },
          inject: [MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [DRIZZLE],
    };
  }
}
```

Each microservice imports it with its own schema:

```ts
// apps/auth/src/auth.module.ts — lines 17-25
DrizzleModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    connectionString: config.getOrThrow<string>('DATABASE_URL'),
    schema: { ...authSchema },
  }),
  inject: [ConfigService],
}),
```

### Database-per-service isolation

| Microservice | Database | Tables |
|---|---|---|
| Auth | `auth-db` | `auths_table` (1 table) |
| User | `user-db` | `buyers`, `sellers`, `languages`, `skills`, `experiences`, `educations`, `social_links`, `certificates` (8 tables) |
| Gig | `gig-db` | `gigs_table` (1 table) |
| Chat | `chat-db` | `conversations`, `messages` (2 tables) |

In development (`compose.infra.yml`), a single PostgreSQL instance hosts all 4 databases via
`scripts/init-dbs.sql`. In production (`compose.prod.yml`), they use separate named volumes.

---

## 11. Failure Tolerance & Degradation

| Failure | Behavior | File |
|---|---|---|
| RabbitMQ down at auth boot | App starts; `ClientProxy` queue buffers messages; `emit` succeeds silently. First `onModuleInit` connection attempt retries | `auth.module.ts` line 30-50 |
| Email SMTP unavailable | `email.service.ts` catches error, logs it, returns no throw — user still gets account | `apps/email/src/email.service.ts:50-55` |
| gRPC channel to microservice down | Gateway's `firstValueFrom(gRPC call)` throws `UNAVAILABLE` — `RpcToHttpFilter` returns HTTP 503 | `apps/gateway/src/filters/rpc-to-http.filter.ts` |
| Redis unreachable for chat | Chat service still starts — first `publish`/`subscribe` reconnects via ioredis `retryStrategy` | `apps/chat/src/redis/redis.module.ts` |
| Poison DB row | Every DB operation wrapped in `tryit` — error becomes a gRPC exception, never crashes the process | All service files |
| GatewayGuard JWT verification fails | Single gRPC call rejected with `PERMISSION_DENIED`, process continues | `packages/common/src/guards/gateway.guard.ts` |
| Password hashing failure | Caught by `tryit`, converted to gRPC `INTERNAL`, `AuthService.register()` never creates incomplete user | `apps/auth/src/auth.service.ts:59-60` |

### The `tryit` pattern everywhere

Every database or crypto operation uses the Go-style `[data, error]` tuple:

```ts
const [user, userErr] = await tryit(
  this.db.select().from(AuthTable).where(eq(AuthTable.email, data.email)).limit(1).then(r => r[0]),
);
if (userErr) throwGrpcError('INTERNAL', userErr.message);
if (user) throwGrpcError('ALREADY_EXISTS', 'User already exists');
```

This avoids try/catch blocks entirely (zero try/catch in any service file), keeps the happy path
left-aligned, and makes error branching explicit. The `tryit` utility returns `[undefined,
ErrorInstance]` on failure and `[Result, null]` on success — so the type is always
`[T | undefined, Error | null]`.

---

## 12. Module Map & Data Stores

```
kaj-bazar/
├── apps/
│   ├── gateway/                   ★ the API gateway — HTTP + WebSocket → gRPC proxying
│   │   └── src/
│   │       ├── main.ts            bootstrap: ValidationPipe, cookieParser, Swagger, RpcToHttpFilter
│   │       ├── gateway.module.ts  root module: imports auth/user/gig/chat + ConfigModule
│   │       ├── auth/              auth.controller.ts (HTTP routes), auth.service.ts (gRPC proxy)
│   │       │                       auth.module.ts (gRPC client + Passport strategies)
│   │       ├── chat/              chat.gateway.ts (Socket.IO ↔ gRPC streaming bridge)
│   │       │                       chat.module.ts (gRPC client for CHAT_SERVICE)
│   │       ├── gig/               gig.controller.ts, gig.service.ts (gRPC proxy)
│   │       ├── user/              buyer.controller.ts, seller.controller.ts (gRPC proxy)
│   │       ├── guards/            access-token.guard.ts (silent refresh)
│   │       ├── strategies/        jwt.strategy.ts, google.strategy.ts
│   │       ├── filters/           rpc-to-http.filter.ts, grpc-error.mapper.ts
│   │       ├── decorators/        bearer-token.decorator.ts, get-user.decorator.ts
│   │       └── grpc.interceptor.ts createModuleAuthInterceptor()
│   │
│   ├── auth/                      authentication microservice — gRPC + RabbitMQ producer
│   │   └── src/
│   │       ├── main.ts            gRPC bootstrap + GrpcValidationPipe
│   │       ├── auth.module.ts     DrizzleModule + JwtModule + 2 RMQ clients + GatewayGuard
│   │       ├── auth.controller.ts gRPC handlers (@AuthServiceControllerMethods)
│   │       ├── auth.service.ts    register, login, tokens, social, password mgmt
│   │       ├── utils/             hashing.util.ts (bcryptjs)
│   │       └── schemas/           auth.schema.ts (pgTable `auths_table`)
│   │
│   ├── user/                      user microservice — gRPC + RabbitMQ consumer (hybrid)
│   │   └── src/
│   │       ├── main.ts            hybrid bootstrap: gRPC + RMQ
│   │       ├── buyer/             buyer.controller.ts, buyer.service.ts
│   │       ├── seller/            seller.controller.ts, seller.service.ts (tx + upsert)
│   │       └── schemas/           buyers, sellers + 6 sub-tables with drizzle relations
│   │
│   ├── gig/                       gig microservice — gRPC only
│   │   └── src/
│   │       ├── main.ts            gRPC bootstrap
│   │       ├── gig.controller.ts  gRPC handlers
│   │       ├── gig.service.ts     search (dynamic query builder), CRUD
│   │       └── schemas/           gig.schema.ts (pgTable `gigs_table`)
│   │
│   ├── chat/                      chat microservice — gRPC + Redis pub/sub
│   │   └── src/
│   │       ├── main.ts            gRPC bootstrap
│   │       ├── chat.controller.ts gRPC handlers (createMessage, findOrCreateConversation, streamMessages)
│   │       ├── chat.service.ts    Redis pub/sub across instances + DB persistence
│   │       ├── redis/             redis.module.ts (pub + sub connections), redis.constants.ts
│   │       └── schemas/           conversation.schema.ts, message.schema.ts
│   │
│   └── email/                     email microservice — RabbitMQ-only consumer
│       └── src/
│           ├── main.ts            RMQ-only bootstrap
│           ├── email.controller.ts @EventPattern('send-email')
│           ├── email.service.ts    mailerService.sendMail() with EJS templates
│           └── templates/         11 EJS templates (verifyEmail, forgotPassword, etc.)
│
├── packages/
│   └── common/                    ★ shared library — built first via tsc + tsc-alias
│       └── src/
│           ├── index.ts           re-exports: utils, guards, dtos, database, pipes, modules, protos
│           ├── protos/            auth.proto, user.proto, gig.proto, chat.proto + getProtoPath()
│           ├── generated/         ts-proto output: auth.ts, user.ts, gig.ts, chat.ts
│           ├── guards/            gateway.guard.ts (gatewaytoken), grpc.guard.ts (user JWT)
│           ├── dtos/              16 DTOs with class-validator + Swagger decorators
│           ├── database/          drizzle.module.ts, drizzle.module-definition.ts
│           ├── pipes/             grpc-validation.pipe.ts
│           ├── modules/           grpc-auth.module.ts (JwtModule + GrpcGuard)
│           └── utils/             tryit.util.ts, throw-rpc-err.util.ts
│
└── compose.yml / compose.infra.yml / compose.prod.yml
```

### Which store owns what — and why

| Store | Owns | Why this store |
|---|---|---|
| **PostgreSQL (×4)** | Auth credentials + tokens, buyer/seller profiles + sub-tables, gigs, conversations + messages | Relational integrity with FK cascades, transactions for atomic profile updates, UNIQUE constraints for idempotency |
| **Redis** | Cross-instance chat message bus (`chat:messages` channel) | Sub-millisecond pub/sub delivery, dedicated subscriber connection model, no durability overhead needed (DB is source of truth) |
| **RabbitMQ** | `email-queue` + `user-queue` | Async event emission that decouples auth from email/user: email failure never blocks registration, user service creates buyer asynchronously. Persistent queues survive broker restarts |
| **gRPC** | Synchronous inter-service contracts (auth queries, user queries, gig CRUD, chat CRUD + streaming) | Type-safe service interfaces from protobuf, bi-directional streaming for chat, shared proto definitions in `@app/common` |

### Communication topology summary

```
                         ┌───────────┐
                         │  Client   │
                         │ (Browser) │
                         └─────┬─────┘
                               │ HTTP + WebSocket
                               ▼
                     ┌─────────────────┐
                     │   Gateway       │
                     │  (port 3001)    │
                     │  HTTP + WS      │
                     └───┬───┬───┬───┬─┘
                         │   │   │   │
               gRPC (gatewaytoken + user JWT)
               ▼       ▼   ▼       ▼
         ┌────────┐ ┌────┐ ┌───┐ ┌───────┐
         │ Auth   │ │User│ │Gig│ │ Chat  │
         │ :50051 │ │    │ │   │ │       │
         └───┬────┘ └────┘ └───┘ └──┬────┘
             │                       │
      RabbitMQ               Redis Pub/Sub
      ┌──────┴──────┐              │
      ▼              ▼             │
  ┌────────┐  ┌──────────┐        │
  │ Email  │  │ User (RMQ)│────────┘
  │ (RMQ)  │  │  consumer │
  └────────┘  └──────────┘
```

### Key numbers

| Metric | Count |
|---|---|
| NestJS apps | 6 |
| Shared packages | 1 (`@app/common`) |
| gRPC services | 5 (`Auth`, `Buyer`, `Seller`, `Gig`, `Chat`) |
| gRPC RPCs | 24 total |
| Proto files | 4 |
| DB schemas | 4 (1 per service) |
| PostgreSQL tables | 12 total across all schemas |
| RabbitMQ queues | 2 (`email-queue`, `user-queue`) |
| RabbitMQ event patterns | 2 (`send-email`, `user-created`) |
| Redis channels | 1 (`chat:messages`) |
| Docker services (dev) | 9 (4 postgres, rabbitmq, redis, gateway, 3 microservices) |
| Passport strategies | 2 (JWT, Google OAuth) |
| Auth guards (gateway) | 1 (`AccessTokenGuard` with silent refresh) |
| Auth guards (microservice) | 2 (`GatewayGuard` global + `GrpcGuard` per-endpoint) |
| EJS email templates | 11 |

---

*The interesting engineering in this system isn't the CRUD — it's the clean separation of trust
boundaries (two-layer gRPC auth), the transparent token rotation that keeps client code simple,
the WebSocket↔gRPC streaming bridge with leak-free lifecycle management, the Redis pub/sub that
makes chat horizontally scalable with zero code changes to the streaming logic, and the
transactional upsert that handles nested resource updates atomically without application-level
sagas. Each pattern solves a real distributed-systems problem with the simplest correct
mechanism.*