export const config = {
  API_GATEWAY_URL: process.env.NEXT_PUBLIC_BASE_ENDPOINT || "",
  SOCKET_GATEWAY_URL: process.env.NEXT_PUBLIC_SOCKET_ENDPOINT || "",
  // API_GATEWAY_URL: "https://kajbazar-api.asif-haque.com/api/v1/gateway",
  CLIENT_URL: process.env.CLIENT_URL || "",
};
