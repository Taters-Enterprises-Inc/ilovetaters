import axios from "axios";
import {
  EditAdminUserParam,
  UpdateAdminSettingStoreParam,
  UpdateStoreDealParam,
  UpdateStoreProductParam,
} from "features/admin/core/admin.params";
import { AdminCateringBookingModel } from "features/admin/core/domain/admin-catering-booking.model";
import { AdminPopclubRedeemModel } from "features/admin/core/domain/admin-popclub-redeem.model";
import { AdminSessionModel } from "features/admin/core/domain/admin-session.model";
import { AdminShopOrderModel } from "features/admin/core/domain/admin-shop-order.model";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import { GetAdminCateringBookingsModel } from "features/admin/core/domain/get-admin-catering-bookings.model";
import { GetAdminPopclubRedeemsModel } from "features/admin/core/domain/get-admin-popclub-redeems.model";
import { GetAdminSettingStoresModel } from "features/admin/core/domain/get-admin-setting-stores.model";
import { GetAdminShopOrdersModel } from "features/admin/core/domain/get-admin-shop-orders.model";
import { GetAdminStoreDealsModel } from "features/admin/core/domain/get-admin-store-deals.model";
import { GetAdminStoreProductsModel } from "features/admin/core/domain/get-admin-store-products.model";
import { GroupModel } from "features/admin/core/domain/group.model";
import { ProductCategoryModel } from "features/admin/core/domain/product-category.model";
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

export interface AdminDeclineRedeemResponse {
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

export interface UploadProofOfPaymentAdminResponse {
  data: {
    message: string;
  };
}

export interface ValidateReferenceNumberAdminResponse {
  data: {
    message: string;
  };
}
export interface AdminShopOrderUpdateStatusResponse {
  data: {
    message: string;
  };
}

export interface AdminPrivilegeResponse {
  data: {
    message: string;
  };
}

export interface GetAdminCateringBookingsResponse {
  data: {
    message: string;
    data: GetAdminCateringBookingsModel;
  };
}

export interface GetAdminCateringBookingResponse {
  data: {
    message: string;
    data: AdminCateringBookingModel;
  };
}

export interface AdminCateringBookingUpdateStatusResponse {
  data: {
    message: string;
  };
}

export interface GetAdminStoreDealsResponse {
  data: {
    message: string;
    data: GetAdminStoreDealsModel;
  };
}

export interface UpdateStoreDealResponse {
  data: {
    message: string;
  };
}

export interface GetAdminStoreProductsResponse {
  data: {
    message: string;
    data: GetAdminStoreProductsModel;
  };
}

export interface GetProductCategoriesResponse {
  data: {
    message: string;
    data: Array<ProductCategoryModel>;
  };
}

export interface UpdateStoreProductResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSettingStoresResponse {
  data: {
    message: string;
    data: GetAdminSettingStoresModel;
  };
}

export interface UpdateAdminSettingStoreResponse {
  data: {
    message: string;
  };
}

export function AdminDeclineRedeemRepository(
  redeemCode: string
): Promise<AdminDeclineRedeemResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/popclub/${redeemCode}/decline`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateAdminSettingStoreRepository(
  param: UpdateAdminSettingStoreParam
): Promise<UpdateStoreProductResponse> {
  return axios.put(`${REACT_APP_DOMAIN_URL}api/admin/store`, param, {
    withCredentials: true,
  });
}

export function GetAdminSettingStoresRepository(
  query: string
): Promise<GetAdminSettingStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/setting/stores${query}`, {
    withCredentials: true,
  });
}

export function UpdateStoreProductRepository(
  param: UpdateStoreProductParam
): Promise<UpdateStoreProductResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/product`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function GetProductCategoriesRepository(): Promise<GetProductCategoriesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/product-categories`, {
    withCredentials: true,
  });
}

export function GetAdminStoreProductsRepository(
  query: string
): Promise<GetAdminStoreProductsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/product${query}`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateStoreDealRepository(
  param: UpdateStoreDealParam
): Promise<UpdateStoreDealResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/deal`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminStoreDealsRepository(
  query: string
): Promise<GetAdminStoreDealsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/deal${query}`,
    {
      withCredentials: true,
    }
  );
}

export function AdminCateringBookingUpdateStatusRepository(
  formData: FormData
): Promise<AdminCateringBookingUpdateStatusResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/catering-update-status`,
    formData,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminCateringBookingRepository(
  trackingNo: string
): Promise<GetAdminCateringBookingResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/catering/${trackingNo}`, {
    withCredentials: true,
  });
}
export function GetAdminCateringBookingsRepository(
  query: string
): Promise<GetAdminCateringBookingsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/catering${query}`, {
    withCredentials: true,
  });
}

export function AdminPrivilegeRepository(
  formData: FormData
): Promise<AdminPrivilegeResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/admin-privilege`,
    formData,
    {
      withCredentials: true,
    }
  );
}

export function AdminShopOrderUpdateStatusRepository(
  formData: FormData
): Promise<AdminShopOrderUpdateStatusResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/shop-update-status`,
    formData,
    {
      withCredentials: true,
    }
  );
}

export function ValidateReferenceNumberAdminRepository(
  formData: FormData
): Promise<ValidateReferenceNumberAdminResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/reference-num/`,
    formData,
    {
      withCredentials: true,
    }
  );
}

export function UploadProofOfPaymentAdminRepository(
  formData: FormData
): Promise<UploadProofOfPaymentAdminResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/admin/payment/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
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


