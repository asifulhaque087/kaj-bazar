import axios, { type AxiosInstance } from "axios";
import { config } from "@src/config";
import jwt from "jsonwebtoken";

export class AxiosService {
  public axios: AxiosInstance;

  private constructor(instance: AxiosInstance) {
    this.axios = instance;
  }

  // This is the static factory method. It's the primary way to create instances.
  public static create(baseUrl: string, serviceName: string): AxiosService {
    // Generate Token For Gateway

    const payload = { serviceName };

    // const gatewayToken = await sign(payload, `${config.GATEWAY_JWT_TOKEN}`);
    const gatewayToken = jwt.sign(payload, `${config.GATEWAY_JWT_TOKEN}`);

    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        gatewayToken,
      },
      withCredentials: true,
    });

    const serviceInstance = new AxiosService(instance);
    return serviceInstance;
  }
}

// async function main() {
//   const authService = await AxiosService.create(
//     "http://auth.example.com",
//     "authService"
//   );
//   const otherService = await AxiosService.create(
//     "http://other.example.com",
//     "otherService"
//   );

//   const hello = authService.axios.defaults.baseURL;
// }

// main();
