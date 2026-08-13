FROM node:alpine AS development

WORKDIR /usr/src/app

RUN npm install -g pnpm

# Manifests first for cached, workspace-aware install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/common/package.json packages/common/package.json
COPY apps/gig/package.json apps/gig/package.json

RUN pnpm install

# Sources: the shared package and this app only
COPY packages/common packages/common
COPY apps/gig apps/gig

# Build the shared package (@app/common) AND this app. The "..." filter
# includes workspace dependencies, so @app/common/dist is produced too.
RUN pnpm --filter "@kaj-bazar/gig..." run build


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/common/package.json packages/common/package.json
COPY apps/gig/package.json apps/gig/package.json

RUN pnpm install --prod --filter "@kaj-bazar/gig..."

# Compiled app + the compiled shared package it requires at runtime
# (@app/common is external; its dist/ — including dist/protos — must be present)
COPY --from=development /usr/src/app/apps/gig/dist ./apps/gig/dist
COPY --from=development /usr/src/app/packages/common/dist ./packages/common/dist

CMD ["node", "apps/gig/dist/main"]
