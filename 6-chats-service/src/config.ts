// config.js
export const config = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  NODE_ENV: process.env.NODE_ENV || "",
  RABBITMQ_ENDPOINT: process.env.RABBITMQ_ENDPOINT || "",
  JWT_TOKEN: process.env.JWT_TOKEN || "",
  CLOUD_NAME: process.env.CLOUD_NAME || "",
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || "",
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || "",
  GATEWAY_JWT_TOKEN: process.env.GATEWAY_JWT_TOKEN || "",
  API_GATEWAY_URL: process.env.API_GATEWAY_URL || "",
  ELASTIC_SEARCH_URL: process.env.ELASTIC_SEARCH_URL || "",
};
