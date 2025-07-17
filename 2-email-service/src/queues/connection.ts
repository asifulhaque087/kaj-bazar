// import { config } from '@src/config';
// import client, { Channel, Connection } from 'amqplib';

// async function createConnection(): Promise<Channel | undefined> {
//   try {
//     const connection: Connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
//     const channel: Channel = await connection.createChannel();
//     console.log('Notification server connected to queue successfully...');
//     closeConnection(channel, connection);
//     return channel;
//   } catch (error) {
//     console.log('error', 'NotificationService error createConnection() method:', error);
//     return undefined;
//   }
// }

// function closeConnection(channel: Channel, connection: Connection): void {
//   process.once('SIGINT', async () => {
//     await channel.close();
//     await connection.close();
//   });
// }

// export { createConnection } ;

import { config } from "@src/config";
import client, { Channel, ChannelModel } from "amqplib";

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection: ChannelModel = await client.connect(
      `${config.RABBITMQ_ENDPOINT}`
    );
    const channel: Channel = await connection.createChannel();
    console.log("Notification server connected to queue successfully...");
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    console.log(
      "error",
      "NotificationService error createConnection() method:",
      error
    );
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: ChannelModel): void {
  process.once("SIGINT", async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection };
