This repo contains all codes for the ECommerce freelance marketplace application.

### Client
* The `client` folder contains the frontend code.
* The frontend application is built using `React`, `Typescript` and `Tailwindcss`.


## Running Locally
* To start the services locally, you need to first start the required services inside the docker compose file.
* `redis`
  * `docker compose up -d redis`
* `mongodb`
  * `docker compose up -d mongodb`
* `mysql`
  * `docker compose up -d mysql`
* `postgres`
  * `docker compose up -d postgres`
* `rabbitmq`
  * `docker compose up -d redis`


Please start the microservices in this order.
* `review service`
* `order service`
* `chat service`
* `gig service`
* `users service`
* `auth service`
* `notification service`
* Before you start the `gateway service`, make sure all other services are running without errors.

