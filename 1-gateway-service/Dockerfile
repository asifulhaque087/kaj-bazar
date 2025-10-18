# ** --- base stage ---
FROM oven/bun:1.2.21-alpine AS base

# ** --- builder stage ---
FROM base AS builder

WORKDIR /build

COPY package.json .
COPY bun.lock .

RUN bun install

COPY . .

RUN bun run build

# ** --- runnner stage ---

FROM base AS runner

WORKDIR /app

COPY --from=builder /build/package.json .
COPY --from=builder /build/bun.lock .

RUN bun install --production

COPY --from=builder /build/dist ./dist

EXPOSE 4000

CMD [ "bun", "run", "start" ]
