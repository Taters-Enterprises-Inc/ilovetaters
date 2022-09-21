import axios from "axios";
import { EditAdminUserParam } from "features/admin/core/admin.params";
import { AdminPopclubRedeemModel } from "features/admin/core/domain/admin-popclub-redeem.model";
import { AdminSessionModel } from "features/admin/core/domain/admin-session.model";
import { AdminShopOrderModel } from "features/admin/core/domain/admin-shop-order.model";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import { GetAdminPopclubRedeemsModel } from "features/admin/core/domain/get-admin-popclub-redeems.model";
import { GetAdminShopOrdersModel } from "features/admin/core/domain/get-admin-shop-orders.model";
import { GroupModel } from "features/admin/core/domain/group.model";
import { UserModel } from "features/admin/core/domain/user.model";
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

export interface GetAdminUsersResponse {
  data: {
    message: string;
    data: Array<UserModel>;
  };
}

export interface CreateAdminUserResponse {
  data: {
    message: string;
  };
}

export interface GetAdminUserResponse {
  data: {
    message: string;
    data: UserModel;
  };
}

export interface GetAdminGroupsResponse {
  data: {
    message: string;
    data: Array<GroupModel>;
  };
}

export interface EditAdminUserResponse {
  data: {
    message: string;
  };
}

export interface GetAdminStoresResponse {
  data: {
    message: string;
    data: Array<AdminStoreModel>;
  };
}

export interface GetAdminUserStoresResponse {
  data: {
    message: string;
    data: Array<AdminStoreModel>;
  };
}

export interface UpdateAdminUserStoresResponse {
  data: {
    message: string;
  };
}

export interface CreateAdminGroupResponse {
  data: {
    message: string;
  };
}
export function CreateAdminGroupRepository(
  formData: FormData
): Promise<CreateAdminGroupResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth/create-group`, formData, {
    withCredentials: true,
  });
}

export function UpdateAdminUserStoresRepository(
  formData: FormData
): Promise<GetAdminUserStoresResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/admin/stores`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetAdminUserStoresRepository(
  userId: string
): Promise<GetAdminUserStoresResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/stores?user_id=${userId}`,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminStoresRepository(): Promise<GetAdminStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/stores`, {
    withCredentials: true,
  });
}

export function EditAdminUserRepository(
  param: EditAdminUserParam
): Promise<EditAdminUserResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/auth/edit-user/${param.userId}`,
    param.formData,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminGroupsRepository(): Promise<GetAdminGroupsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/groups`, {
    withCredentials: true,
  });
}

export function GetAdminUserRepository(
  userId: string
): Promise<GetAdminUserResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/user/${userId}`, {
    withCredentials: true,
  });
}

export function CreateAdminUserRepository(
  formData: FormData
): Promise<CreateAdminUserResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth/create_user`, formData, {
    withCredentials: true,
  });
}

export function GetAdminUsersRepository(
  query: string
): Promise<GetAdminUsersResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/users${query}`, {
    withCredentials: true,
  });
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
