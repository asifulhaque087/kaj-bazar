FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
# COPY tsconfig.json tsconfig.json
# COPY nest-cli.json nest-cli.json
COPY apps/chat/package.json apps/chat/package.json

RUN npm install -g pnpm
RUN pnpm install

COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/chat apps/chat
COPY libs libs

RUN pnpm run build chat
# RUN pnpm run build chat && pnpm --filter chat run build:migrate


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/chat/package.json apps/chat/package.json

RUN npm install -g pnpm

# RUN pnpm install --prod
RUN pnpm install --prod --filter chat...

COPY --from=development /usr/src/app/dist ./dist

# only for proto files
COPY --from=development /usr/src/app/libs/common/src/protos ./libs/common/src/protos

CMD ["node", "dist/apps/chat/main"]