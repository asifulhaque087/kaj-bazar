import express, { Express } from 'express';
import { GatewayServer } from '@gateway/server';
import { redisConnection } from '@gateway/redis/redis.connection';

class Application {
  public initialize(): void {
    console.log('project init');
    const app: Express = express();
    const server: GatewayServer = new GatewayServer(app);
    server.start();
    redisConnection.redisConnect();
  }
}

const application: Application = new Application();
application.initialize();
