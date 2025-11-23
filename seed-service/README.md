## Notification Microservice
* The notification microservice is responsible for sending out email notifications to users.
* The email templates available are for
  * `forgot password`
  * `verify email`
  * `reset password success`
  * `offer`
  * `order placed`
  * `order receipt`
  * `order extension request`
  * `order extension approval`
  * `order delivered`
* Notification service uses these tools as the main tools
  * `Your shared library`
  * `NodeJS`
  * `Express`
  * `Typescript`
  * `Rabbitmq`
  * `Elasticsearch`
  * `Nodemailer`
  * `Email templates`
* There are other packages that are used.
* You can update the version of `NodeJS` used inside the `Dockerfile` and `Dockerfile.dev`.
* Make sure you already have your own shared library published.
* Copy the `.npmrc` file from your shared library folder and replace `${NPM_TOKEN}` with the actual `personal access token` you created.
* Once you have your `.npmrc` and before you run `npm install` command, replace all occurrences of `@fvoid/shared-lib` with your own shared library.
* After replacing all occurrences of `@fvoid/shared-lib`, you can then run `npm install` command.
* Copy contents of `.env.dev` to `.env` file
  * Get a sender email and password from `https://ethereal.email`
  * Add username value from `ethereal` to `SENDER_EMAIL`
  * Add password value from `ethereal` to `SENDER_EMAIL_PASSWORD`
* In order to see the emails, you have to keep the same `ethereal` page open. If you close the page, you will have to recreate the email and password and add them to your `.env` file.
* You can start the service with `npm run dev`.

### Create docker images
* You can create your own docker image from this microservice.
* Create an account on `hub.docker.com` or login if you already have one.
* Make sure to login on your terminal as well.
* Steps to build and push your image to docker hub
  * `docker build -t <your-dockerhub-username>/jobber-notification .`
  * `docker tag <your-dockerhub-username>/jobber-notification <your-dockerhub-username>/jobber-notification:stable`
  * `docker push <your-dockerhub-username>/jobber-notification:stable`


    "start": "pm2 start ./build/src/app.js -i 5 --attach --watch | pino-pretty -c",
    "stop": "pm2 stop all",
    "delete": "pm2 delete all",
    "dev": "nodemon -r tsconfig-paths/register src/app.ts | pino-pretty -c",
    "lint:check": "eslint 'src/**/*.ts'",
    "lint:fix": "eslint 'src/**/*.ts' --fix",
    "prettier:check": "prettier --check 'src/**/*.{ts,json}'",
    "prettier:fix": "prettier --write 'src/**/*.{ts,json}'",
    "build": "tsc --project tsconfig.json && tsc-alias -p tsconfig.json && ts-node tools/copyAssets.ts",

    "build": "tsc && tsx tools/copyAssets.ts",
    "test": "jest --coverage=true -w=1 --forceExit --detectOpenHandles --watchAll=false"

