import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface LoginBscResponse {
  data: {
    message: string;
  };
}

export function LoginBscRepository(param: FormData): Promise<LoginBscResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth-bsc/login`, param, {
    withCredentials: true,
  });
}
