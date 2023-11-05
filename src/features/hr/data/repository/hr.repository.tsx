import axios from "axios";
import { HrSessionModel } from "features/hr/core/domain/hr-session.model";
import { LoginHrParam } from "features/hr/core/hr.params";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface GetHrSessionResponse {
  data: {
    message: string;
    data: HrSessionModel;
  };
}

export interface LoginHrResponse {
  data: {
    message: string;
  };
}
export interface LogoutHrResponse {
  data: {
    message: string;
  };
}

export function LogoutHrRepository(): Promise<LogoutHrResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/auth-hr/logout`, {
    withCredentials: true,
  });
}

export function GetHrSessionRepository(): Promise<GetHrSessionResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/hr/session`, {
    withCredentials: true,
  });
}

export function LoginHrRepository(
  param: LoginHrParam
): Promise<LoginHrResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth-hr/login`, param, {
    withCredentials: true,
  });
}
