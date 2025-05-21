import express, { Express } from 'express';
import { start } from '@auth/server';
import { configureCloudinary } from '@fvoid/shared-lib';

import { databaseConnection } from '@auth/database';
import { config } from '@auth/config';

const initialize = (): void => {
  configureCloudinary({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_API_KEY,
    api_secret: config.CLOUD_API_SECRET
  });

  const app: Express = express();
  databaseConnection();
  start(app);
};

initialize();
