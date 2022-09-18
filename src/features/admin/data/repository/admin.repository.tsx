import axios from "axios";
import { GetAdminShopOrdersParam } from "features/admin/core/admin.params";
import { AdminSessionModel } from "features/admin/core/domain/admin-session.model";
import { AdminShopOrderModel } from "features/admin/core/domain/admin-shop-order.model";
import { GetAdminShopOrdersModel } from "features/admin/core/domain/get-admin-shop-orders.model";
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

export interface GetAdminShopOrdersResponse {
  data: {
    message: string;
    data: GetAdminShopOrdersModel;
  };
}

export interface GetAdminShopOrderResponse {
  data: {
    message: string;
    data: AdminShopOrderModel;
  };
}
export function GetAdminShopOrderRepository(
  trackingNo: string
): Promise<GetAdminShopOrderResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/shop/${trackingNo}`, {
    withCredentials: true,
  });
}

export function GetAdminShopOrdersRepository(
  param: GetAdminShopOrdersParam
): Promise<GetAdminShopOrdersResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/shop${
      param.page_no ? `?page_no=${param.page_no}` : ""
    }${param.per_page ? `&per_page=${param.per_page}` : ""}${
      param.status ? `&status=${param.status}` : ""
    }`,
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
