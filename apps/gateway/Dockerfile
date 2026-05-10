FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/gateway/package.json apps/gateway/package.json

RUN npm install -g pnpm

RUN pnpm install
# RUN pnpm install --config.confirmModulesPurge=false

COPY apps/gateway apps/gateway
COPY libs libs

RUN pnpm run build gateway

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/gateway/package.json apps/gateway/package.json

RUN npm install -g pnpm

# RUN pnpm install --prod
RUN pnpm install --prod --filter gateway...

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/gateway/main"]