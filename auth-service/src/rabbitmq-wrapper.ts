import { handleAsync } from "@fvoid/shared-lib";
import { connect, type Channel, type ChannelModel } from "amqplib";

class MQWrapper {
  private _connection?: ChannelModel;
  private _channel?: Channel;

  get channel() {
    if (!this._channel)
      throw new Error("Cannot access channel before connecting");

    return this._channel;
  }

  get connection() {
    if (!this._connection)
      throw new Error("Cannot access channel before connecting");

    return this._connection;
  }

  async connect(url: string) {
    this._connection = await handleAsync(
      connect(url),
      "RabbitMq Connection Error !!!"
    );

    this._channel = await handleAsync(
      this._connection.createChannel(),
      "RabbitMq Connection Error !!!"
    );

    console.log("Rabbitmq Connected 🎉");

    // try {
    //   this._connection = await connect(url);
    //   this._channel = await this._connection.createChannel();
    //   console.log("rabbitmq connected");
    // } catch (error) {
    //   throw new ConnectionError("RabbitMq Connection Error !!!");
    // }
  }
}

export const mqWrapper = new MQWrapper();
