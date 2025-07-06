import type { AxiosResponse } from "axios";
import { AxiosService } from "./axios";
import { config } from "@src/config";

class SearchService {
  axiosService: AxiosService;

  private constructor(instance: AxiosService) {
    this.axiosService = instance;
  }

  public static async create(): Promise<SearchService> {
    const instance = await AxiosService.create(
      `${config.GIG_BASE_URL}/api/v1/gig`,
      "gig"
    );

    const serviceInstance = new SearchService(instance);
    // console.log("AxiosService.create() method finished.");

    return serviceInstance;
  }

  //   ======================== Services ==================

  async getCurrentUser(): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.get(
      "/currentuser"
    );
    return response;
  }

  async gigSearch(
    query: string,
    from: string,
    size: string,
    type: string
  ): Promise<AxiosResponse> {
    console.log("hello hwo areyou");

    // const response: AxiosResponse = await this.axiosService.axios.get(
    //   `/search/${from}/${size}/${type}?${query}`
    // );

    // console.log(config.GIG_BASE_URL)

    console.log(`=== ${this.axiosService.axios.defaults.baseURL}/29`);

    const response: AxiosResponse = await this.axiosService.axios.get(`/29`);

    return response;
  }
}

export const searchService: SearchService = await SearchService.create();
