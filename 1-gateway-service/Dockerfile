
FROM node:21-alpine3.18 as base

# Stage 1: Build Staff

FROM base as builder

WORKDIR /home/build

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


# Stage 2: Runner

FROM base as runner

WORKDIR /home/app

COPY --from=builder /home/build/build build/
COPY --from=builder /home/build/package*.json .

RUN npm install --omit=dev

EXPOSE 4000

CMD [ "npm", "run", "start" ]
