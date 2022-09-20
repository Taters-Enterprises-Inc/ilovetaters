import axios from "axios";
import { AdminPopclubRedeemModel } from "features/admin/core/domain/admin-popclub-redeem.model";
import { AdminSessionModel } from "features/admin/core/domain/admin-session.model";
import { AdminShopOrderModel } from "features/admin/core/domain/admin-shop-order.model";
import { GetAdminPopclubRedeemsModel } from "features/admin/core/domain/get-admin-popclub-redeems.model";
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

export interface GetAdminPopclubRedeemsResponse {
  data: {
    message: string;
    data: GetAdminPopclubRedeemsModel;
  };
}

export interface GetAdminPopclubRedeemResponse {
  data: {
    message: string;
    data: AdminPopclubRedeemModel;
  };
}

export interface AdminCompleteRedeemResponse {
  data: {
    message: string;
  };
}

export function AdminCompleteRedeemRepository(
  redeemCode: string
): Promise<AdminCompleteRedeemResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/popclub/${redeemCode}/complete`,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminPopclubRedeemRepository(
  redeemCode: string
): Promise<GetAdminPopclubRedeemResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/popclub/${redeemCode}`, {
    withCredentials: true,
  });
}

export function GetAdminPopclubRedeemsRepository(
  query: string
): Promise<GetAdminPopclubRedeemsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/popclub${query}`, {
    withCredentials: true,
  });
}

export function GetAdminShopOrderRepository(
  trackingNo: string
): Promise<GetAdminShopOrderResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/shop/${trackingNo}`, {
    withCredentials: true,
  });
}

export function GetAdminShopOrdersRepository(
  query: string
): Promise<GetAdminShopOrdersResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/shop${query}`, {
    withCredentials: true,
  });
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
