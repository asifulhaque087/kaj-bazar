// config.js
export const config = {
  NODE_ENV: process.env.NODE_ENV || "",
  CLIENT_URL: process.env.CLIENT_URL || "",
  RABBITMQ_ENDPOINT: process.env.RABBITMQ_ENDPOINT || "",
  GATEWAY_JWT_TOKEN: process.env.GATEWAY_JWT_TOKEN || "",
};
