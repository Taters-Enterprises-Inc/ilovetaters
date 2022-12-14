import axios from "axios";
import {
  EditAdminUserParam,
  UpdateAdminSettingStoreOperatingHoursParam,
  UpdateAdminSettingStoreParam,
  UpdateStoreDealParam,
  UpdateStoreCatersPackageParam,
  UpdateStoreProductParam,
  UpdateStoreCatersPackageAddonParam,
  UpdateStoreCatersProductAddonParam,
  CreateAdminUserParam,
  LoginAdminParam,
  AdminPrivilegeParam,
  ValidateReferenceNumberParam,
  UpdateUserStoresParam,
  CreateAdminGroupParam,
  AdminUserDiscountChangeStatusParam,
  AdminDeclineRedeemParam,
  AdminCompleteRedeemParam,
  AdminCateringBookingUpdateStatusParam,
  AdminShopOrderUpdateStatusParam,
  AdminSurveyVerificationChangeStatusParam,
  CreateAdminSettingShopProductParam,
  EditAdminSettingShopProductParam,
  UpdateCatersPackageParam,
  UpdateAdminSettingShopProductStatusParam,
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
import { CategoryModel } from "features/admin/core/domain/category.model";
import { UserModel } from "features/admin/core/domain/user.model";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { GetAdminStoreCatersPackagesModel } from "features/admin/core/domain/get-admin-store-caters-packages.model";
import { GetAdminStoreCatersPackageAddonsModel } from "features/admin/core/domain/get-admin-store-caters-package-addons.model";
import { GetAdminStoreCatersProductAddonsModel } from "features/admin/core/domain/get-admin-store-caters-product-addons.model";
import { ShopTransactionLogsModel } from "features/admin/core/domain/shop-transaction-logs.model";
import { CateringTransactionLogsModel } from "features/admin/core/domain/catering-transaction-logs.model";
import { GetAdminNotificationModel } from "features/admin/core/domain/get-admin-notification.model";
import { GetAdminUserDiscountsModel } from "features/admin/core/domain/get-admin-user-discounts.model";
import { AdminUserDiscountModel } from "features/admin/core/domain/admin-user-discount.model";
import { GetAdminUsersModel } from "features/admin/core/domain/get-admin-users.model";
import { GetAdminSurveyVerificationsModel } from "features/admin/core/domain/get-admin-survey-verification.model";
import { AdminSurveyVerificationModel } from "features/admin/core/domain/admin-survey-verification.model";
import { GetAdminSettingShopProductsModel } from "features/admin/core/domain/get-admin-setting-shop-products.model";
import { GetAdminSettingShopProductModel } from "features/admin/core/domain/get-admin-setting-shop-product.model";
import { ProductTypeModel } from "features/shared/core/domain/product_type.model";
import { AdminSettingCatersPackageModel } from "features/admin/core/domain/admin-setting-caters-package.model";

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

export interface GetAdminUserDiscountsResponse {
  data: {
    message: string;
    data: GetAdminUserDiscountsModel;
  };
}

export interface GetAdminUserDiscountResponse {
  data: {
    message: string;
    data: AdminUserDiscountModel;
  };
}

export interface GetAdminSurveyVerificationResponse {
  data: {
    message: string;
    data: AdminSurveyVerificationModel;
  };
}

export interface GetAdminSurveyVerificationsResponse {
  data: {
    message: string;
    data: GetAdminSurveyVerificationsModel;
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
    data: GetAdminUsersModel;
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

export interface AdminCateringPrivilegeResponse {
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

export interface GetAdminProductCategoriesResponse {
  data: {
    message: string;
    data: Array<CategoryModel>;
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

export interface GetAdminStoreResponse {
  data: {
    message: string;
    data: AdminStoreModel;
  };
}

export interface UpdateAdminSettingStoreOperatingHoursResponse {
  data: {
    message: string;
  };
}

export interface GetCatersPackageCategoriesResponse {
  data: {
    message: string;
    data: Array<CategoryModel>;
  };
}

export interface getAllCataringPackageResponse {
  data: {
    data: AdminSettingCatersPackageModel;
    message: string;
  };
}

export interface createNewCataringPackageResponse {
  data: {
    data: AdminSettingCatersPackageModel;
    message: string;
  };
}

export interface UpdateCataringPackageResponse {
  data: {
    message: string;
  };
}

export interface deleteCataringPackageResponse {
  data: {
    message: string;
  };
}
export interface GetAdminStoreCatersPackagesResponse {
  data: {
    message: string;
    data: GetAdminStoreCatersPackagesModel;
  };
}

export interface UpdateStoreCatersPackageResponse {
  data: {
    message: string;
  };
}

export interface GetDealCategoriesResponse {
  data: {
    message: string;
    data: Array<CategoryModel>;
  };
}

export interface GetAdminStoreCatersPackageAddonsResponse {
  data: {
    message: string;
    data: GetAdminStoreCatersPackageAddonsModel;
  };
}

export interface UpdateStoreCatersPackageAddonResponse {
  data: {
    message: string;
  };
}

export interface GetAdminStoreCatersProductAddonsResponse {
  data: {
    message: string;
    data: GetAdminStoreCatersProductAddonsModel;
  };
}

export interface UpdateStoreCatersProductAddonResponse {
  data: {
    message: string;
  };
}

export interface GetShopTransactionLogsResponse {
  data: {
    message: string;
    data: Array<ShopTransactionLogsModel>;
  };
}

export interface GetCateringTransactionLogsResponse {
  data: {
    message: string;
    data: Array<CateringTransactionLogsModel>;
  };
}

export interface GetAdminNotificationsResponse {
  data: {
    message: string;
    data: GetAdminNotificationModel;
  };
}

export interface UpdateAdminNotificationDateSeenResponse {
  data: {
    message: string;
  };
}
export interface AdminUserDiscountChangeStatusResponse {
  data: {
    message: string;
  };
}

export interface AdminSurveyVerificationChangeStatusResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSurveyVerificationResponse {
  data: {
    message: string;
    data: AdminSurveyVerificationModel;
  };
}

export interface GetAdminSurveyVerificationsResponse {
  data: {
    message: string;
    data: GetAdminSurveyVerificationsModel;
  };
}

export interface GetAdminSettingShopProductsResponse {
  data: {
    message: string;
    data: GetAdminSettingShopProductsModel;
  };
}

export interface CreateAdminSettingShopProductResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSettingShopProductResponse {
  data: {
    message: string;
    data: GetAdminSettingShopProductModel;
  };
}

export interface EditAdminSettingShopProductResponse {
  data: {
    message: string;
  };
}

export interface DeleteAdminSettingShopProductResponse {
  data: {
    message: string;
  };
}

export interface UpdateAdminSettingShopProductStatusResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSettingShopProductTypesResponse {
  data: {
    message: string;
    data: Array<ProductTypeModel>;
  };
}

export function GetAdminSettingShopProductTypesRepository(): Promise<GetAdminSettingShopProductTypesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/shop-product/type`, {
    withCredentials: true,
  });
}

export function UpdateAdminSettingShopProductStatusRepository(
  param: UpdateAdminSettingShopProductStatusParam
): Promise<DeleteAdminSettingShopProductResponse> {
  return axios.put(`${REACT_APP_DOMAIN_URL}api/admin/shop-product`, param, {
    withCredentials: true,
  });
}

export function DeleteAdminSettingShopProductRepository(
  productId: string
): Promise<DeleteAdminSettingShopProductResponse> {
  return axios.delete(
    `${REACT_APP_DOMAIN_URL}api/admin/delete-shop-product?id=${productId}`,
    {
      withCredentials: true,
    }
  );
}

export function EditAdminSettingShopProductRepository(
  param: EditAdminSettingShopProductParam
): Promise<EditAdminSettingShopProductResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/edit-shop-product`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function GetAdminSettingShopProductRepository(
  productId: string
): Promise<GetAdminSettingShopProductResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/shop-product?product-id=${productId}`,
    {
      withCredentials: true,
    }
  );
}

export function CreateAdminSettingShopProductRepository(
  param: CreateAdminSettingShopProductParam
): Promise<CreateAdminSettingShopProductResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/admin/shop-product`, param, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
}

export function GetAdminSettingShopProductsRepository(
  query: string
): Promise<GetAdminSettingShopProductsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/shop-products${query}`, {
    withCredentials: true,
  });
}

export function GetAdminSurveyVerificationsRepository(
  query: string
): Promise<GetAdminSurveyVerificationsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/survey-verifications${query}`,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminSurveyVerificationRepository(
  id: string
): Promise<GetAdminSurveyVerificationResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/survey-verification/${id}`,
    {
      withCredentials: true,
    }
  );
}

export function AdminUserDiscountChangeStatusRepository(
  param: AdminUserDiscountChangeStatusParam
): Promise<AdminUserDiscountChangeStatusResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/discount/user-discount-change-status`,
    param,
    {
      withCredentials: true,
    }
  );
}
export function UpdateAdminNotificationDateSeenRepository(
  notificationId: number
) {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/notification/${notificationId}/seen`,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminNotificationsRepository() {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/notifications`, {
    withCredentials: true,
  });
}

export function GetCateringTransactionLogsRepository(
  transactionId: number
): Promise<GetCateringTransactionLogsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/catering-transaction-logs/${transactionId}`,
    {
      withCredentials: true,
    }
  );
}

export function GetShopTransactionLogsRepository(
  transactionId: number
): Promise<GetShopTransactionLogsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/snackshop-transaction-logs/${transactionId}`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateStoreCatersProductAddonRepository(
  param: UpdateStoreCatersProductAddonParam
): Promise<UpdateStoreCatersProductAddonResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/caters-product-addon`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminStoreCatersProductAddonsRepository(
  query: string
): Promise<GetAdminStoreCatersProductAddonsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/caters-product-addon${query}`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateStoreCatersPackageAddonRepository(
  param: UpdateStoreCatersPackageAddonParam
): Promise<UpdateStoreCatersPackageAddonResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/caters-package-addon`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminStoreCatersPackageAddonsRepository(
  query: string
): Promise<GetAdminStoreCatersPackageAddonsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/caters-package-addon${query}`,
    {
      withCredentials: true,
    }
  );
}

export function GetDealCategoriesRepository(): Promise<GetDealCategoriesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/deal-categories`, {
    withCredentials: true,
  });
}

export function UpdateStoreCatersPackageRepository(
  param: UpdateStoreCatersPackageParam
): Promise<UpdateStoreCatersPackageResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/caters-package`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function getAllCataringPackageRepository(
  query: string | null
): Promise<getAllCataringPackageResponse> {
  if (query === null)
    return axios.get(
      `${REACT_APP_DOMAIN_URL}api/admin/setting/caters-package`,
      {
        withCredentials: true,
      }
    );
  else
    return axios.get(
      `${REACT_APP_DOMAIN_URL}api/admin/setting/caters-package${query}`,
      {
        withCredentials: true,
      }
    );
}

export function createNewCataringPackageRepository(
  query: any
): Promise<createNewCataringPackageResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/caters-package/create-package`,
    query,
    {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
}

export function UpdateCataringPackageRepository(
  param: UpdateCatersPackageParam
): Promise<UpdateCataringPackageResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/caters-package/update-package`,
    param,
    {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
}

export function deleteCataringPackageRepository(
  query: any
): Promise<deleteCataringPackageResponse> {
  console.log(query);
  return axios.delete(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/caters-package/delete-package/${query}`,
    {
      withCredentials: true,
    }
  );
}
export function GetAdminStoreCatersPackagesRepository(
  query: string
): Promise<GetAdminStoreCatersPackagesResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/caters-package${query}`,
    {
      withCredentials: true,
    }
  );
}

export function GetCatersPackageCategoriesRepository(): Promise<GetCatersPackageCategoriesResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/caters-package-categories`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateAdminSettingStoreOperatingHoursRepository(
  param: UpdateAdminSettingStoreOperatingHoursParam
): Promise<UpdateAdminSettingStoreOperatingHoursResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/admin/store-operating-hours`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminStoreRepository(
  storeId: string
): Promise<GetAdminStoreResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/store?store_id=${storeId}`,
    {
      withCredentials: true,
    }
  );
}

export function AdminDeclineRedeemRepository(
  param: AdminDeclineRedeemParam
): Promise<AdminDeclineRedeemResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/popclub/decline-redeem`,
    param,
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

export function GetAdminProductCategoriesRepository(): Promise<GetAdminProductCategoriesResponse> {
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
  param: AdminCateringBookingUpdateStatusParam
): Promise<AdminCateringBookingUpdateStatusResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/catering-update-status`,
    param,
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

export function AdminCateringPrivilegeRepository(
  param: AdminPrivilegeParam
): Promise<AdminCateringPrivilegeResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/admin-catering-privilege`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function AdminPrivilegeRepository(
  param: AdminPrivilegeParam
): Promise<AdminPrivilegeResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/admin/admin-privilege`, param, {
    withCredentials: true,
  });
}

export function AdminShopOrderUpdateStatusRepository(
  param: AdminShopOrderUpdateStatusParam
): Promise<AdminShopOrderUpdateStatusResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/shop-update-status`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function ValidateReferenceNumberAdminRepository(
  param: ValidateReferenceNumberParam
): Promise<ValidateReferenceNumberAdminResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/admin/reference-num/`, param, {
    withCredentials: true,
  });
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
  param: CreateAdminGroupParam
): Promise<CreateAdminGroupResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth/create-group`, param, {
    withCredentials: true,
  });
}

export function UpdateAdminUserStoresRepository(
  param: UpdateUserStoresParam
): Promise<GetAdminUserStoresResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/admin/stores`, param, {
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
    param.body,
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
  param: CreateAdminUserParam
): Promise<CreateAdminUserResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth/create-user`, param, {
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
  param: AdminCompleteRedeemParam
): Promise<AdminCompleteRedeemResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/popclub/complete-redeem`,
    param,
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

export function GetAdminUserDiscountRepository(
  id: string
): Promise<GetAdminUserDiscountResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/discount/${id}`, {
    withCredentials: true,
  });
}

export function GetAdminUserDiscountsRepository(
  query: string
): Promise<GetAdminUserDiscountsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/discounts${query}`, {
    withCredentials: true,
  });
}

export function AdminSurveyVerificationChangeStatusRepository(
  param: AdminSurveyVerificationChangeStatusParam
): Promise<AdminSurveyVerificationChangeStatusResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/survey-verification/survey-verification-change-status`,
    param,
    {
      withCredentials: true,
    }
  );
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
  param: LoginAdminParam
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
