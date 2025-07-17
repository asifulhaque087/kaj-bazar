FROM node:21-alpine3.18 AS base

# Stage 1: Build Staff

FROM base AS builder

WORKDIR /home/build

COPY package*.json .

# RUN npm install
RUN npm ci

COPY . .

RUN npm run build


# Stage 2: Runner

FROM base AS runner

WORKDIR /home/app

COPY --from=builder /home/build/build build/
COPY --from=builder /home/build/package*.json .

RUN npm install -g pm2

# RUN npm install --omit=dev
RUN npm ci --omit=dev

CMD [ "npm", "run", "start" ]


