import axios from "axios";
import {
  CreateBscUserParam,
  LoginBscParam,
} from "features/bsc/core/bsc.params";
import { BscSessionModel } from "features/bsc/core/domain/bsc-session.model";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface LoginBscResponse {
  data: {
    message: string;
  };
}

export interface LogoutBscResponse {
  data: {
    message: string;
  };
}

export interface CreateBscUserResponse {
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

export function GetBscSessionRepository(): Promise<GetBscSessionResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/bsc/session`, {
    withCredentials: true,
  });
}

export function CreateBscUserRepository(
  param: CreateBscUserParam
): Promise<CreateBscUserResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth-bsc/create-user`, param, {
    withCredentials: true,
  });
}

export function LoginBscRepository(
  param: LoginBscParam
): Promise<LoginBscResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth-bsc/login`, param, {
    withCredentials: true,
  });
}

export function LogoutBscRepository(): Promise<LogoutBscResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/auth-bsc/logout`, {
    withCredentials: true,
  });
}
