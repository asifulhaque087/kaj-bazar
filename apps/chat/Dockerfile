FROM node:alpine AS development

WORKDIR /usr/src/app

RUN npm install -g pnpm

# Manifests first for cached, workspace-aware install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY tsconfig.base.json tsconfig.json ./
COPY packages/common/package.json packages/common/package.json
COPY apps/chat/package.json apps/chat/package.json

RUN pnpm install

# Sources: the shared package and this app only
COPY packages/common packages/common
COPY apps/chat apps/chat

# Build the shared package (@app/common) AND this app. The "..." filter
# includes workspace dependencies, so @app/common/dist is produced too.
RUN pnpm --filter "@kaj-bazar/chat..." run build

# Compile the migration runner
RUN pnpm --filter "@kaj-bazar/chat" run build:migrate

# Generate migration files from the schema
RUN pnpm --filter "@kaj-bazar/chat" run db:generate

# migrate runner expects ./migrations but drizzle-kit outputs to drizzle/migrations/
RUN cp -r apps/chat/drizzle/migrations apps/chat/migrations


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/common/package.json packages/common/package.json
COPY apps/chat/package.json apps/chat/package.json

RUN pnpm install --prod --filter "@kaj-bazar/chat..."

# Compiled app + compiled shared package
COPY --from=development /usr/src/app/apps/chat/dist ./apps/chat/dist
COPY --from=development /usr/src/app/packages/common/dist ./packages/common/dist

# Compiled migration runner + generated migration files
COPY --from=development /usr/src/app/apps/chat/dist-migration ./apps/chat/dist-migration
COPY --from=development /usr/src/app/apps/chat/migrations ./apps/chat/migrations

# Run pending migrations then start the server
CMD ["sh", "-c", "cd apps/chat && node dist-migration/drizzle/migrate.js && node dist/main"]
