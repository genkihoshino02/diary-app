import http from "@/http-common";
import { AxiosPromise } from "axios";
import { User } from "@/types/user";
import { getAuthDataFromStorage } from "@/utils/auth-data";

interface LoginInfo {
  email: string;
  password: string;
}

class ClientApiService {
  login(data: LoginInfo): AxiosPromise<User> {
    return http.post("/auth/sign_in", data);
  }
  logout() {
    return http.delete("/auth/sign_out", { headers: getAuthDataFromStorage() });
  }
}

export default new ClientApiService();
