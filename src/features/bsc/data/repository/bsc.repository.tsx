import axios from "axios";
import { BscSessionModel } from "features/bsc/core/domain/bsc-session.model";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface LoginBscResponse {
  data: {
    message: string;
  };
}
export interface GetBscSessionResponse {
  data: {
    message: string;
    data: BscSessionModel;
  };
}

export interface LogoutBscResponse {
  data: {
    message: string;
  };
}

export function GetBscSessionRepository(): Promise<GetBscSessionResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/bsc/session`, {
    withCredentials: true,
  });
}

export function LoginBscRepository(param: FormData): Promise<LoginBscResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth-bsc/login`, param, {
    withCredentials: true,
  });
}

export function LogoutBscRepository(): Promise<LogoutBscResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/auth-bsc/logout`, {
    withCredentials: true,
  });
}
