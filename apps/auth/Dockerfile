FROM node:24-alpine AS development

WORKDIR /usr/src/app

# Pin pnpm version to match local environment
RUN npm install -g pnpm@9.0.0

# Manifests first for cached, workspace-aware install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/common/package.json packages/common/package.json
COPY apps/auth/package.json apps/auth/package.json

RUN pnpm install

# Sources: the shared package and this app only
COPY packages/common packages/common
COPY apps/auth apps/auth

# Build the shared package (@app/common) AND this app. The "..." filter
# includes workspace dependencies, so @app/common/dist is produced too.
RUN pnpm --filter "@kaj-bazar/auth..." run build

# Compile the migration runner (drizzle/migrate.ts → dist-migration/)
RUN pnpm --filter "@kaj-bazar/auth" run build:migrate


FROM node:24-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Pin pnpm version to match local environment
RUN npm install -g pnpm@9.0.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/common/package.json packages/common/package.json
COPY apps/auth/package.json apps/auth/package.json

# Bypass strict lockfile check for native pnpm binary in Docker
ENV PNPM_VERIFY_NATIVE_BINARY_LOCKFILE=false

RUN pnpm install --prod --filter "@kaj-bazar/auth..."

# Compiled app + the compiled shared package it requires at runtime
# (@app/common is external; its dist/ — including dist/protos — must be present)
COPY --from=development /usr/src/app/apps/auth/dist ./apps/auth/dist
COPY --from=development /usr/src/app/packages/common/dist ./packages/common/dist

# Compiled migration runner + generated migration files
COPY --from=development /usr/src/app/apps/auth/dist-migration ./apps/auth/dist-migration
COPY --from=development /usr/src/app/apps/auth/drizzle/migrations ./apps/auth/drizzle/migrations

CMD ["node", "apps/auth/dist/main"]
