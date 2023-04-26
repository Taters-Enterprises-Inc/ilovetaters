import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { LoginAuditParam } from "../core/audit.params";

export interface LoginAuditResponse {
  data: {
    message: string;
  };
}

export interface LogoutAuditResponse {
  data: {
    message: string;
  };
}

export function LoginAuditRepository(
  param: LoginAuditParam
): Promise<LoginAuditResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/audit/login`, param, {
    withCredentials: true,
  });
}

export function LogoutAuditRepository(): Promise<LogoutAuditResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/audit/logout`, {
    withCredentials: true,
  });
}
