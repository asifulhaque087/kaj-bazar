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
    const connection = await connect(url);

    this._connection = await connect(url);

    this._channel = await connection.createChannel();

    console.log("rabbitmq connected");
  }
}

export const mqWrapper = new MQWrapper();
