import express, { Express } from 'express';
import { start } from '@auth/server';
// const cloudinary = require('cloudinary');

import cloudinary from "cloudinary"

import { databaseConnection } from '@auth/database';
// import { config } from '@auth/config';

const initialize = (): void => {
  // config.cloudinaryConfig();


    cloudinary.v2.config({

      // cloud_name: this.CLOUD_NAME,
      // api_key:  this.CLOUD_API_KEY,
      // api_secret: this.CLOUD_API_SECRET

      cloud_name: "dkrc4r7lr",
      api_key: "683862111924169",
      api_secret: "bSW6V906xyFKAlPORKgq8qbU49E" 
    });


  const app: Express = express();
  databaseConnection();
  start(app);
};

initialize();
