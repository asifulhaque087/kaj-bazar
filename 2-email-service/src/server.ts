import "express-async-errors";
import http from "http";

import { Application } from "express";
import { healthRoutes } from "@src/routes";
// import { createConnection } from '@src/queues/connection';
// import { Channel } from 'amqplib';
// import { consumeAuthEmailMessages, consumeOrderEmailMessages } from '@src/queues/email.consumer';
// import { consumeOrderEmailMessages } from '@src/queues/email.consumer';
import { mqWrapper } from "@src/rabbitmq-wrapper";
import { config } from "@src/config";
import { SendEmailListener } from "@src/events/listeners/send-email-listener";

const SERVER_PORT = 4001;

export function start(app: Application): void {
  startServer(app);
  app.use("", healthRoutes());
  startQueues();
}

async function startQueues(): Promise<void> {
  // const emailChannel: Channel = (await createConnection()) as Channel;

  await mqWrapper.connect(config.RABBITMQ_ENDPOINT!);

  process.once("SIGINT", async () => {
    await mqWrapper.channel.close();
    await mqWrapper.connection.close();
  });

  new SendEmailListener(mqWrapper.channel).listen();

  // await consumeAuthEmailMessages(emailChannel);
  // await consumeOrderEmailMessages(emailChannel);
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    console.log(
      `Worker with process id of ${process.pid} on notification server has started`
    );
    httpServer.listen(SERVER_PORT, () => {
      console.log(`Notification server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.log("error", "NotificationService startServer() method:", error);
  }
}
