FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
# COPY tsconfig.json tsconfig.json
# COPY nest-cli.json nest-cli.json
# COPY webpack.config.js webpack.config.js
COPY apps/email/package.json apps/email/package.json

RUN npm install -g pnpm
RUN pnpm install

COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY webpack.config.js webpack.config.js

COPY apps/email apps/email
COPY libs libs

RUN pnpm run build email

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/email/package.json apps/email/package.json

RUN npm install -g pnpm

# RUN pnpm install --prod
RUN pnpm install --prod --filter email...

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/email/main"]