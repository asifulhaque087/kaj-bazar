# kaj-bazar — Agent Instructions

## Monorepo structure

pnpm workspace + Turborepo. 6 NestJS apps under `apps/`, 1 shared package `packages/common` (`@app/common`).

| package | role | port | transports |
|---|---|---|---|
| `@kaj-bazar/gateway` | REST API gateway | 3001 | HTTP, WebSocket (Socket.IO) → gRPC to backends |
| `@kaj-bazar/auth` | auth microservice | 50051 | gRPC + RabbitMQ (emits events to email & user) |
| `@kaj-bazar/user` | user microservice | 50051 | gRPC + RabbitMQ (consumes events) |
| `@kaj-bazar/gig` | gig microservice | 50051 | gRPC |
| `@kaj-bazar/chat` | chat microservice | 50051 | gRPC + Redis pub/sub |
| `@kaj-bazar/email` | email microservice | — | RabbitMQ-only consumer |
| `@app/common` | shared package | — | DTOs, guards, drizzle module, generated protos |

## Build order: `@app/common` MUST build first

Every app depends on `@app/common`. Turbo enforces `dependsOn: ["^build"]` but when running manually:

```bash
pnpm --filter @app/common build
pnpm --filter @kaj-bazar/<app> build
```

`@app/common` uses `tsc` + `tsc-alias`, then copies non-TS proto files into dist. Gateway and microservices use `nest build` with the **SWC builder** (not webpack — the comment in the old AGENTS.md was wrong; every `nest-cli.json` has `"builder": "swc"`).

## Developer commands (root)

```bash
pnpm install
pnpm dev              # turbo run dev — starts all apps in watch mode
pnpm build            # turbo run build
pnpm lint             # turbo run lint  — eslint. Currently commented out in eslint.config.mjs, all rules disabled.
pnpm format           # prettier --write "apps/**/*.ts" "packages/**/*.ts"
pnpm proto:gen        # regenerate gRPC TS stubs from .proto files
pnpm db:generate      # drizzle-kit generate
pnpm db:push          # drizzle-kit push (runs on dev container startup)
pnpm db:studio        # drizzle-kit studio
pnpm clean            # rm -rf .turbo dist and tsbuildinfo files
pnpm clean:all        # clean + rm -rf node_modules
```

## Proto codegen

Source: `packages/common/src/protos/*.proto` (auth, user, gig, chat)
Output: `packages/common/src/generated/*.ts` (ts-proto with `nestJs=true,addGrpcMetadata=true`)

Generated files export `XxxServiceController` interface, `XxxServiceControllerMethods` decorator, `XXX_SERVICE_NAME`, and `XXX_PACKAGE_NAME` constants — used by both gateway (client stubs) and microservices (controllers).

Proto files are located at runtime via `getProtoPath()` in `packages/common/src/protos/index.ts`. It searches multiple directories (dist/protos, source dir, monorepo paths, CWD) making it work in dev, Docker, and webpack bundles. **Always use `getProtoPath('filename.proto')` in `ClientsModule.registerAsync` — never hardcode proto paths.**

## Docker

Three compose files:
- `compose.yml` — full dev stack: rabbitmq, 4 postgres DBs, redis, all 6 microservices with hot-reload (develop watch mode)
- `compose.infra.yml` — single postgres (4 DBs via init script), rabbitmq, redis — for local microservice development without Dockerizing apps
- `compose.prod.yml` — production image-based deployment with named volumes

In `compose.yml`, each service first builds `@app/common`, then optionally runs `db:push`, then starts its app. Microservice containers map internal port 50051 to unique host ports (4983-4986). Gateway exposes 3001.

Each app reads `.env` from `apps/<app>/.env`. No `.env.example` files.

## Communication architecture

```
Client → HTTP/WS → Gateway (port 3001) → gRPC → auth/user/gig/chat (port 50051 each)
Auth ──RabbitMQ──→ Email (send-email queue)
Auth ──RabbitMQ──→ User  (user-created queue)
Chat ←──Redis pub/sub──→ Chat (cross-instance message broadcast)
```

## Auth

Gateway authenticates users via JWT (access/refresh tokens as httpOnly cookies). Gateway-to-microservice auth uses a shared JWT `gatewaytoken` signed with per-service secrets (`AUTH_GATEWAY_SECRET`, `USER_GATEWAY_SECRET`, etc.), injected via a gRPC interceptor (`grpc.interceptor.ts`). Microservices verify it with `GatewayGuard` from `@app/common`.

Gateway uses Passport with Google OAuth 2.0 strategy + JWT strategy. All gRPC client modules use `createModuleAuthInterceptor` with the corresponding secret.

Swagger docs at `/swagger` (cookie auth for access_token + refresh_token).

## Key imports

```typescript
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common/generated/auth';
import { AUTH_PACKAGE_NAME } from '@app/common/generated/auth';
import { getProtoPath } from '@app/common';
```

Path alias `@app/common` → `packages/common/src` (root `tsconfig.json`).

## Database (Drizzle ORM + PostgreSQL)

Apps with DB: auth, user, gig, chat. Each has:
- `drizzle.config.ts` (out: `drizzle/migrations`, schema: `src/schemas`, dialect: postgresql)
- `DATABASE_URL` in `.env`

Auth has an additional migration script: `build:migrate` and `db:migrate` compile and run `drizzle/migrate.ts` for programmatic migrations.

## Testing

Jest 30 + ts-jest + @nestjs/testing + supertest. No test script in any `package.json` — only 2 stub spec files exist (`auth.controller.spec.ts`, `email.controller.spec.ts`) and both call a non-existent `getHello()`. No test config file. Tests would need to be run manually via e.g. `npx jest` from an app directory. No e2e tests, no test DB setup.

## Config quirks

- `.prettierrc`: singleQuote, trailingComma all
- `eslint.config.mjs` fully commented out — **no active lint rules**
- `turbo.json` db tasks have `cache: false` and no `dependsOn` — they operate independently per-app
- `db:studio` is `persistent: true` in turbo (runs until cancelled)
- `pnpm-workspace.yaml` allows builds for `@nestjs/core`, `@swc/core`, `esbuild`, `grpc-tools`, `protobufjs`, `unrs-resolver` — needed for native module compilation
- Root `raf.ts` is a scratch file with code patterns/notes — not a real source file
- `apis/` directory has REST client files (`.http`) for manual API testing via VS Code REST Client or similar
- `charts/` has Helm charts per service; `.github/workflows/` has CI/CD pipelines deploying to Kubernetes with Helm
- `diagrams/` has Excalidraw architecture diagrams

## Gateway env variables required

```env
AUTH_GRPC_URL, USER_GRPC_URL, GIG_GRPC_URL, CHAT_GRPC_URL
ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION
AUTH_GATEWAY_SECRET, USER_GATEWAY_SECRET, GIG_GATEWAY_SECRET, CHAT_GATEWAY_SECRET, ORDER_GATEWAY_SECRET, REVIEW_GATEWAY_SECRET
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
CLIENT_URL
```

## Microservice env variables required

Auth: `DATABASE_URL`, `GRPC_PORT`, `GATEWAY_SECRET`, `RABBITMQ_URL`, `CLIENT_URL`, `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRATION`, `REFRESH_TOKEN_SECRET`, `REFRESH_TOKEN_EXPIRATION`

User/gig/chat: `DATABASE_URL`, `GATEWAY_SECRET`, `RABBITMQ_URL` (if consuming events)

Chat additionally: `REDIS_HOST`

Email: `RABBITMQ_URL`

## ProtoToHttp exception translation

Gateway uses `RpcToHttpFilter` (`filters/rpc-to-http.filter.ts`) as a global filter to convert gRPC errors to HTTP responses.
