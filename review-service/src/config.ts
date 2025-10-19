// config.js
export const config = {
  // DATABASE_HOST: process.env.DATABASE_HOST || "",
  // DATABASE_USER: process.env.DATABASE_USER || "",
  // DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "",
  // DATABASE_NAME: process.env.DATABASE_NAME || "",
  DATABASE_URL: process.env.DATABASE_URL || "",
  NODE_ENV: process.env.NODE_ENV || "",
  RABBITMQ_ENDPOINT: process.env.RABBITMQ_ENDPOINT || "",
  JWT_TOKEN: process.env.JWT_TOKEN || "",
  CLOUD_NAME: process.env.CLOUD_NAME || "",
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || "",
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || "",
  GATEWAY_JWT_TOKEN: process.env.GATEWAY_JWT_TOKEN || "",
  API_GATEWAY_URL: process.env.API_GATEWAY_URL || "",
  CLUSTER_TYPE: process.env.CLUSTER_TYPE || "",
};
