import axios from "axios";
import { GetAdminSnackshopOrdersParam } from "features/admin/core/admin.params";
import { AdminSessionModel } from "features/admin/core/domain/admin-session.model";
import { AdminSnackshopOrderModel } from "features/admin/core/domain/admin-snackshop-order.model";
import { GetAdminSnackshopOrdersModel } from "features/admin/core/domain/get-admin-snackshop-orders.model";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface LoginAdminResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSessionResponse {
  data: {
    message: string;
    data: AdminSessionModel;
  };
}

export interface LogoutAdminResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSnackshopOrdersResponse {
  data: {
    message: string;
    data: GetAdminSnackshopOrdersModel;
  };
}

export function GetAdminSnackshopOrdersRepository(
  param: GetAdminSnackshopOrdersParam
): Promise<GetAdminSnackshopOrdersResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/shop?page_no=${param.page_no}&per_page=${
      param.per_page
    }${param.status !== null ? `&status=${param.status}` : ""}`,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminSessionRepository(): Promise<GetAdminSessionResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/session`, {
    withCredentials: true,
  });
}

export function LoginAdminRepository(
  param: FormData
): Promise<LoginAdminResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth/login`, param, {
    withCredentials: true,
  });
}

export function LogoutAdminRepository(): Promise<LogoutAdminResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/auth/logout`, {
    withCredentials: true,
  });
}
