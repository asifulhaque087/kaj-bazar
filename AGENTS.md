# kaj-bazar — Agent Instructions

## Monorepo structure

pnpm workspace + Turborepo. 6 apps under `apps/`, 1 shared package `packages/common` (`@app/common`).

| package | role | port | transports |
|---|---|---|---|
| `@kaj-bazar/gateway` | REST API gateway | 3001 | HTTP, WebSocket (Socket.IO) → gRPC to backends |
| `@kaj-bazar/auth` | auth microservice | 50051 | gRPC + RabbitMQ (emits events) |
| `@kaj-bazar/user` | user microservice | 50051 | gRPC + RabbitMQ (consumes events) |
| `@kaj-bazar/gig` | gig microservice | 50051 | gRPC |
| `@kaj-bazar/chat` | chat microservice | 50051 | gRPC + Redis (pub/sub) |
| `@kaj-bazar/email` | email microservice | — | RabbitMQ-only consumer |
| `@app/common` | shared package | — | DTOs, guards, drizzle module, generated protos |

## Developer commands (root)

```bash
pnpm install
pnpm dev              # turbo run dev — starts all apps in watch mode
pnpm build            # turbo run build — @app/common builds first (dependsOn: ^build)
pnpm lint             # turbo run lint
pnpm format           # prettier --write "apps/**/*.ts" "packages/**/*.ts"
pnpm proto:gen        # regenerate gRPC TS stubs from .proto files
pnpm db:generate      # drizzle-kit generate (for apps that have db scripts)
pnpm db:push          # drizzle-kit push (for apps that have db scripts)
pnpm db:studio        # drizzle-kit studio (for apps that have db scripts)
```

## Proto codegen

Source: `packages/common/src/protos/*.proto`
Output: `packages/common/src/generated/*.ts` (ts-proto with `nestJs=true,addGrpcMetadata=true`)

```bash
pnpm proto:gen
```

Generated files export `XxxServiceController` interfaces, `XxxServiceControllerMethods` decorator, `XXX_SERVICE_NAME`, and `XXX_PACKAGE_NAME` constants. These are consumed by both the gateway (client stubs) and microservices (controller implementations).

## Build order is critical

`@app/common` MUST be built first — every app depends on `@app/common` for DTOs, guards, generated stubs, and the drizzle module. Turbo enforces this via `dependsOn: ["^build"]`, but when running manually:

```bash
pnpm --filter @app/common build
pnpm --filter @kaj-bazar/<app> build
```

The gateway uses `nest build` (with webpack). Microservices also use `nest build`. Common uses plain `tsc`.

## Database (Drizzle ORM + PostgreSQL)

Apps with DB: `auth`, `user`, `gig`, `chat`. Each has:
- `drizzle.config.ts` (out: `drizzle/migrations`, schema: `src/schemas`, dialect: postgresql)
- `DATABASE_URL` env var in `apps/<app>/.env`

Each app runs `db:push` on container startup (dev). No migration files are checked in — only `drizzle/migrations/` contents.

## Docker compose

`compose.yml` brings up: rabbitmq, 4 postgres DBs, redis, and all 6 apps. Services start in dependency order.

Startup sequence per app container:
```
pnpm --filter @app/common build && sleep 5 && pnpm --filter @kaj-bazar/<app> db:push && pnpm --filter @kaj-bazar/<app> dev
```

Each app reads its env from `apps/<app>/.env` (no `.env.example` files exist). Gateway exposes 3001; microservices are on 4983-4986 (mapped to internal 50051 per service for Docker host port uniqueness).

## Communication architecture

```
Client → HTTP/WS → Gateway (port 3001) → gRPC → auth/user/gig/chat (port 50051 each)
Auth ──RabbitMQ──→ Email (send-email queue)
Auth ──RabbitMQ──→ User  (user-created queue)
Chat ←──Redis pub/sub──→ Chat (cross-instance message broadcast)
```

Gateway authenticates via JWT (access/refresh tokens as httpOnly cookies). Gateway-to-microservice auth uses a shared JWT `gatewaytoken` signed with per-service secrets, injected via gRPC interceptor. Microservices verify it with `GatewayGuard`.

## Key path alias

`@app/common` → `packages/common/src` (configured in root `tsconfig.json`). Use this for all imports from the shared package.

## Testing

Jest 30 + ts-jest + @nestjs/testing + supertest. No jest config file exists — relies on NestJS CLI defaults. Only 2 stub test files exist (`auth.controller.spec.ts`, `email.controller.spec.ts`) — both call `getHello()` which doesn't exist and would fail. No e2e tests. No test database setup.

```bash
pnpm --filter @kaj-bazar/<app> test    # not configured — no test script in package.json
```

Tests can be run via NestJS CLI defaults but no scripts are wired yet.

## Config quirks

- `.prettierrc`: singleQuote, trailingComma all
- `eslint.config.mjs` is fully commented out — no active ESLint configuration
- No `.env.example` files anywhere — check `apps/<app>/.env` for expected vars
- `turbo.json` db tasks (db:generate, db:push, db:studio) have `cache: false` and no `dependsOn` — they operate independently per-app
- All nest-cli.json files use `webpack: true` for the NestJS builder
