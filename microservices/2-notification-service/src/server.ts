import 'express-async-errors';
import http from 'http';

import { Application } from 'express';
import { healthRoutes } from '@notifications/routes';
import { createConnection } from '@notifications/queues/connection';
import { Channel } from 'amqplib';
import { consumeAuthEmailMessages, consumeOrderEmailMessages } from '@notifications/queues/email.consumer';

const SERVER_PORT = 4001;

export function start(app: Application): void {
  startServer(app);
  app.use('', healthRoutes());
  startQueues();
}

async function startQueues(): Promise<void> {
  const emailChannel: Channel = (await createConnection()) as Channel;
  await consumeAuthEmailMessages(emailChannel);
  await consumeOrderEmailMessages(emailChannel);
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    console.log(`Worker with process id of ${process.pid} on notification server has started`);
    httpServer.listen(SERVER_PORT, () => {
      console.log(`Notification server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.log('error', 'NotificationService startServer() method:', error);
  }
}
