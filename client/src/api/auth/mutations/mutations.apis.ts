// import { apiGatewayClient } from "@/api/common/axios.service";

import { apiService } from "@/api/common/axios.service";
import { LoginFormField } from "@/api/auth/schemas/login.schema";
import { RegisterSchema } from "@/api/auth/schemas/register.schema";

const axios = apiService("/auth");

export const register = async (data: RegisterSchema) => {
  const response = await axios.post(`/register`, data);
  return response.data;
};

export const login = async (data: LoginFormField) => {
  data.email = "hello";
  data.password = "asl";

  const response = await axios.post(`/signin`, data);
  return response.data;
};

// class AuthService {
//   axiosService: AxiosService;

//   constructor() {
//     // this.axiosService = new AxiosService(`${config.AUTH_BASE_URL}/api/v1/auth`, 'auth');
//     this.axiosService = AxiosService.create("");
//   }

//   async getCurrentUser(): Promise<AxiosResponse> {
//     const response: AxiosResponse = await axiosAuthInstance.get("/currentuser");
//     return response;
//   }

//   async getRefreshToken(username: string): Promise<AxiosResponse> {
//     const response: AxiosResponse = await axiosAuthInstance.get(
//       `/refresh-token/${username}`
//     );
//     return response;
//   }

//   async changePassword(
//     currentPassword: string,
//     newPassword: string
//   ): Promise<AxiosResponse> {
//     const response: AxiosResponse = await axiosAuthInstance.put(
//       "/change-password",
//       { currentPassword, newPassword }
//     );
//     return response;
//   }

//   async verifyEmail(token: string): Promise<AxiosResponse> {
//     const response: AxiosResponse = await axiosAuthInstance.put(
//       "/verify-email",
//       { token }
//     );
//     return response;
//   }

//   async verifyOTP(
//     otp: string,
//     body: { browserName: string; deviceType: string }
//   ): Promise<AxiosResponse> {
//     const response: AxiosResponse = await axiosAuthInstance.put(
//       `/verify-otp/${otp}`,
//       body
//     );
//     return response;
//   }

//   async resendEmail(data: {
//     userId: number;
//     email: string;
//   }): Promise<AxiosResponse> {
//     const response: AxiosResponse = await axiosAuthInstance.post(
//       "/resend-email",
//       data
//     );
//     return response;
//   }

//   async signUp(body: IAuth): Promise<AxiosResponse> {
//     const response: AxiosResponse = await this.axiosService.axios.post(
//       "/signup",
//       body
//     );
//     return response;
//   }

//   async signIn(body: IAuth): Promise<AxiosResponse> {
//     const response: AxiosResponse = await this.axiosService.axios.post(
//       "/signin",
//       body
//     );
//     return response;
//   }

//   async forgotPassword(email: string): Promise<AxiosResponse> {
//     const response: AxiosResponse = await this.axiosService.axios.put(
//       "/forgot-password",
//       { email }
//     );
//     return response;
//   }

//   async resetPassword(
//     token: string,
//     password: string,
//     confirmPassword: string
//   ): Promise<AxiosResponse> {
//     const response: AxiosResponse = await this.axiosService.axios.put(
//       `/reset-password/${token}`,
//       { password, confirmPassword }
//     );
//     return response;
//   }

//   async getGigs(
//     query: string,
//     from: string,
//     size: string,
//     type: string
//   ): Promise<AxiosResponse> {
//     const response: AxiosResponse = await this.axiosService.axios.get(
//       `/search/gig/${from}/${size}/${type}?${query}`
//     );
//     return response;
//   }

//   async getGig(gigId: string): Promise<AxiosResponse> {
//     const response: AxiosResponse = await this.axiosService.axios.get(
//       `/search/gig/${gigId}`
//     );
//     return response;
//   }

//   async seed(count: string): Promise<AxiosResponse> {
//     const response: AxiosResponse = await this.axiosService.axios.put(
//       `/seed/${count}`
//     );
//     return response;
//   }
// }

// export const authService: AuthService = new AuthService();
