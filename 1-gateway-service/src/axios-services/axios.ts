import axios, { type AxiosInstance } from "axios";
import { sign } from "hono/jwt";
import { config } from "@src/config";

export class AxiosService {
  public axios: AxiosInstance;

  private constructor(instance: AxiosInstance) {
    this.axios = instance;
  }

  // This is the static factory method. It's the primary way to create instances.
  public static async create(
    baseUrl: string,
    serviceName?: string
  ): Promise<AxiosService> {
    let requestGatewayToken = "";
    if (serviceName) {
      requestGatewayToken = await sign(
        { id: serviceName },
        `${config.GATEWAY_JWT_TOKEN}`
      );
    }

    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        gatewayToken: requestGatewayToken,
      },
      withCredentials: true,
    });

    const serviceInstance = new AxiosService(instance);
    // console.log("AxiosService.create() method finished.");
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
