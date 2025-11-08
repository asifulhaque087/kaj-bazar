# Kaj Bazar

This is a scalable freelance marketplace build with microservices architecture, real-time
communication and database per service polyglot persistence pattern.

This application is in development. It has already included all the features listed in [Done Stories](#done-stories). But soon Its going to have all features listed in [All Stories](#all-stories) 🚀.

<a id="toc"></a>

## Table Of Content

- [Technologies](#tech)
- [Done Stories](#done-stories)
- [All Stories](#all-stories)
- [Technical Architecture](#tech-arc)

<a id="tech"></a>

## Technologies

Backend: `Microservice` `Websocket` `Nodejs` `Expressjs` `Redis` `Drizzle` `Postgresql` `Mysql` `Typescript` `RabbitMQ`

Frontend: `Nextjs` `Tanstack Query` `TailwindCSS` `Zustand`

Devops: `CI/CD` `VPS` `Docker` `SSH` `Vim`

<a id="done-stories"></a>

## Done Stories

- Buyer should be able to create an account
- Buyer should be able to become a seller
- Buyer should be able to see a gig details page
- Buyer should be able to contact the gig seller
- Seller should be able to create gig
- Seller should be able to reply the buyer
- Seller should be able to send offer to the buyer
- Buyer and seller should be able to track the activity
- Seller should be able to send the delivery in zip format
- Buyer should be able to send the requirement after accepting offer
- Buyer should be able to see their orders
- Buyer should be able to see seller profile
- Buyer should be able to see all the gigs with pagination
- Buyer should be able to filter gigs
- Buyer and seller should be able to get notification when receive message
- Buyer should be able to download their order invoice

- [Go to **Table Of Content**](#toc)

<a id="all-stories"></a>

## All Stories

- Buyer should be able to verify account
- Buyer should be able to change their password
- Buyer should be able to create account using social media
- Seller should be able to update gig
- Seller should be able to delete gig
- Seller should be able to undo the gig within 1 day
- Seller should be able to deactivate gig
- Seller should be able to re-activate gig
- Seller should be able to update their profile
- Buyer should be able to accept or reject the offer
- Seller should be able to request a delivery time extension.
- Buyer should be able to reject or accept the delivery time extension
- Buyer should be able to filter order table

- [Go to **Table Of Content**](#toc)

<a id="tech-arc"></a>

## Technical Architectures

- Backend with **Nodejs** & **Expressjs**
- Email send with **Nodemailer**
- Frontend with **Nextjs**, **TailwindCSS**
- Communication between services using **RabbitMQ**
- Fetching data with **Tanstack Query**
- Use **Postgresql**, **Mysql** for different services
- Realtime notifications & chat using **websocket** & **Redis pub-sub** architecture
- Impletement **Database Per Service** pattern
- Caching with **Redis**
- Write test using **Jest**
- Github **CI/CD** with **VPS** using **SSH**
- Containerize the services using **Docker**
- Use **Typescript** for better error catching & documentation
- Create a **Shared Library** to reduce code
- Custom **Error Class** and error format

- [Go to **Table Of Content**](#toc)
