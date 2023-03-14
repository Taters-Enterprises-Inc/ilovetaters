import axios from "axios";
import {
  EditAdminUserParam,
  UpdateStoreDealParam,
  UpdateStoreCatersPackageParam,
  UpdateStoreProductParam,
  UpdateStoreCatersPackageAddonParam,
  UpdateStoreCatersProductAddonParam,
  CreateAdminUserParam,
  LoginAdminParam,
  AdminPrivilegeParam,
  ValidateReferenceNumberParam,
  UpdateAdminSettingUserStoresParam,
  CreateAdminGroupParam,
  AdminUserDiscountChangeStatusParam,
  AdminDeclineRedeemParam,
  AdminCompleteRedeemParam,
  AdminCateringBookingUpdateStatusParam,
  AdminShopOrderUpdateStatusParam,
  AdminSurveyVerificationChangeStatusParam,
  CreateAdminSettingShopProductParam,
  EditAdminSettingShopProductParam,
  UpdateAdminSettingShopProductStatusParam,
  UpdateStoreCateringProductParam,
  UpdateAdminCateringOrderItemRemarksParam,
  GetAdminSalesParam,
  GetAdminTotalSalesParam,
  CreateAdminSettingStoreParam,
  GetAdminCateringPackageFlavorsParam,
  GetAdminSettingStoreParam,
  EditAdminSettingStoreParam,
  CopyAdminSettingShopProductParam,
  CreateAdminSettingCateringPackageParam,
  EditAdminSettingCateringPackageParam,
  CopyAdminSettingCateringPackageParam,
  UpdateAdminSettingCateringPackageStatusParam,
  CreateAdminSettingPopclubDealParam,
  AdminInfluencerChangeStatusParam,
  EditAdminSettingPopclubDealParam,
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
import { AdminProductModel } from "features/admin/core/domain/admin-product.model";
import { GetAdminStoreCateringProductsModel } from "features/admin/core/domain/get-admin-store-catering-products.model";
import { PackageFlavorModel } from "features/shared/core/domain/package-flavor.model";
import { SaleModel } from "features/admin/core/domain/sale.model";
import { TotalSalesModel } from "features/admin/core/domain/total-sales.model";
import { StoreMenuModel } from "../../core/domain/store-menu.model";
import { AdminRegionModel } from "features/admin/core/domain/admin-region.model";
import { AdminStoreLocaleModel } from "features/admin/core/domain/admin-store-locale.model";
import { AdminPackageModel } from "features/admin/core/domain/admin-package.model";
import { AdminDealModel } from "features/admin/core/domain/admin-deals.model";
import { GetAdminSettingStoreModel } from "features/admin/core/domain/get-admin-setting-store.model";
import { SnackshopStoreModel } from "features/admin/core/domain/snackshop-store.model";
import { CateringStoreModel } from "features/admin/core/domain/catering-store.model";
import { CustomerSurveyResponseLogsModel } from "features/admin/core/domain/customer-survey-response-logs.model";
import { GetAdminSettingCateringPackagesModel } from "features/admin/core/domain/get-admin-setting-catering-packages.model";
import { GetAdminSettingCateringPackageModel } from "features/admin/core/domain/get-admin-setting-catering-package.model";
import { GetAdminSettingPopclubDealsModel } from "features/admin/core/domain/get-admin-setting-popclub-deals.model";
import { AdminPopclubCategory } from "features/admin/core/domain/admin-popclub-category.model";
import { AdminPopclubProduct } from "features/admin/core/domain/admin-popclub-product.model";
import { PopclubStoreModel } from "features/admin/core/domain/popclub-store.model";
import { GetAdminSettingPopclubDealModel } from "features/admin/core/domain/get-admin-setting-popclub-deal.model";
import { GetAdminInfluencersModel } from "features/admin/core/domain/get-admin-influencers.model";
import { AdminInfluencerModel } from "features/admin/core/domain/admin-influencer.model";

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

export interface GetAdminSettingUserStoresResponse {
  data: {
    message: string;
    data: Array<AdminStoreModel>;
  };
}

export interface GetAdminSettingUserStoreResponse {
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

export interface GetAdminStoreResponse {
  data: {
    message: string;
    data: AdminStoreModel;
  };
}
export interface GetCatersPackageCategoriesResponse {
  data: {
    message: string;
    data: Array<CategoryModel>;
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

export interface GetAdminStoreCateringProductsResponse {
  data: {
    message: string;
    data: GetAdminStoreCateringProductsModel;
  };
}
export interface UpdateStoreCateringProductResponse {
  data: {
    message: string;
  };
}
export interface UpdateAdminCateringOrderItemRemarksResponse {
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

export interface GetAdminProductsResponse {
  data: {
    message: string;
    data: Array<AdminProductModel>;
  };
}

export interface GetAdminCateringPackageFlavorsResponse {
  data: {
    message: string;
    data: Array<PackageFlavorModel>;
  };
}

export interface GetAdminSalesResponse {
  data: {
    message: string;
    data: Array<SaleModel>;
  };
}

export interface GetAdminTotalSalesResponse {
  data: {
    message: string;
    data: TotalSalesModel;
  };
}

export interface GetAdminStoreMenusResponse {
  data: {
    message: string;
    data: Array<StoreMenuModel>;
  };
}

export interface CreateAdminSettingStoreResponse {
  data: {
    message: string;
  };
}

export interface GetAdminRegionStoreCombinationsResponse {
  data: {
    message: string;
    data: Array<AdminRegionModel>;
  };
}

export interface GetAdminPackagesResponse {
  data: {
    message: string;
    data: Array<AdminPackageModel>;
  };
}
export interface GetAdminDealsResponse {
  data: {
    message: string;
    data: Array<AdminDealModel>;
  };
}

export interface GetAdminStoreLocalesResponse {
  data: {
    message: string;
    data: Array<AdminStoreLocaleModel>;
  };
}

export interface GetAdminSettingStoreResponse {
  data: {
    message: string;
    data: GetAdminSettingStoreModel;
  };
}

export interface EditAdminSettingStoreResponse {
  data: {
    message: string;
  };
}
export interface UpdateAdminSettingUserStoresResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSnackshopStoresResponse {
  data: {
    message: string;
    data: Array<SnackshopStoreModel>;
  };
}

export interface GetAdminCateringStoresResponse {
  data: {
    message: string;
    data: Array<CateringStoreModel>;
  };
}

export interface GetAdminSettingProductAddonsResponse {
  data: {
    message: string;
    data: Array<AdminProductModel>;
  };
}

export interface GetCustomerSurveyResponseLogsResponse {
  data: {
    message: string;
    data: Array<CustomerSurveyResponseLogsModel>;
  };
}

export interface CopyAdminSettingShopProductResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSettingCateringPackagesResponse {
  data: {
    message: string;
    data: GetAdminSettingCateringPackagesModel;
  };
}

export interface GetAdminPackageCategoriesResponse {
  data: {
    message: string;
    data: Array<CategoryModel>;
  };
}

export interface CreateAdminSettingCateringPackageResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSettingCateringPackageResponse {
  data: {
    message: string;
    data: GetAdminSettingCateringPackageModel;
  };
}

export interface EditAdminSettingCateringPackageResponse {
  data: {
    message: string;
  };
}

export interface CopyAdminSettingCateringPackageResponse {
  data: {
    message: string;
  };
}

export interface UpdateAdminSettingCateringPackageStatusResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSettingPopclubDealsResponse {
  data: {
    message: string;
    data: GetAdminSettingPopclubDealsModel;
  };
}

export interface GetAdminPopclubCategoriesResponse {
  data: {
    message: string;
    data: Array<AdminPopclubCategory>;
  };
}

export interface GetAdminSettingDealProductsResponse {
  data: {
    message: string;
    data: Array<AdminPopclubProduct>;
  };
}

export interface GetAdminPopclubStoresResponse {
  data: {
    message: string;
    data: Array<PopclubStoreModel>;
  };
}

export interface CreateAdminSettingPopclubDealResponse {
  data: {
    message: string;
  };
}

export interface GetAdminSettingPopclubDealResponse {
  data: {
    message: string;
    data: GetAdminSettingPopclubDealModel;
  };
}

export interface GetAdminInfluencersResponse {
  data: {
    message: string;
    data: GetAdminInfluencersModel;
  };
}

export interface GetAdminInfluencerResponse {
  data: {
    message: string;
    data: AdminInfluencerModel;
  };
}
export interface AdminInfluencerChangeStatusResponse {
  data: {
    message: string;
  };
}

export interface EditAdminSettingPopclubDealResponse {
  data: {
    message: string;
  };
}

export function AdminInfluencerChangeStatusRepository(
  param: AdminInfluencerChangeStatusParam
): Promise<AdminInfluencerChangeStatusResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/discount/influencer-change-status`,
    param,
    { withCredentials: true }
  );
}

export function EditAdminSettingPopclubDealRepository(
  param: EditAdminSettingPopclubDealParam
): Promise<EditAdminSettingShopProductResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/edit-popclub-deal`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function GetAdminInfluencerRepository(
  id: string
): Promise<GetAdminInfluencerResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/influencer/${id}`, {
    withCredentials: true,
  });
}

export function GetAdminInfluencersRepository(
  query: string
): Promise<GetAdminInfluencersResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/influencers${query}`, {
    withCredentials: true,
  });
}

export function GetAdminSettingPopclubDealRepository(
  dealId: string
): Promise<GetAdminSettingPopclubDealResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/popclub-deal?deal-id=${dealId}`,
    {
      withCredentials: true,
    }
  );
}

export function CreateAdminSettingPopclubDealRepository(
  param: CreateAdminSettingPopclubDealParam
): Promise<CreateAdminSettingPopclubDealResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/popclub-deal`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function GetAdminPopclubStoresRepository(): Promise<GetAdminPopclubStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/stores/popclub`, {
    withCredentials: true,
  });
}
export function GetAdminSettingDealProductsRepository(): Promise<GetAdminSettingDealProductsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/deal-shop-products`,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminPopclubCategoriesRepository(): Promise<GetAdminPopclubCategoriesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/popclub/categories`, {
    withCredentials: true,
  });
}

export function GetAdminSettingPopclubDealsRepository(
  query: string
): Promise<GetAdminSettingPopclubDealsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/popclub-deals${query}`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateAdminSettingCateringPackageStatusRepository(
  param: UpdateAdminSettingCateringPackageStatusParam
): Promise<UpdateAdminSettingCateringPackageStatusResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/catering-package`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function CopyAdminSettingCateringPackageRepository(
  param: CopyAdminSettingCateringPackageParam
): Promise<CopyAdminSettingCateringPackageResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/copy-catering-package`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function EditAdminSettingCateringPackageRepository(
  param: EditAdminSettingCateringPackageParam
): Promise<EditAdminSettingCateringPackageResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/edit-catering-package`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function GetAdminSettingCateringPackageRepository(
  packageId: string
): Promise<GetAdminSettingCateringPackageResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/catering-package?package-id=${packageId}`,
    {
      withCredentials: true,
    }
  );
}

export function CreateAdminSettingCateringPackageRepository(
  param: CreateAdminSettingCateringPackageParam
): Promise<CreateAdminSettingCateringPackageResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/catering-package`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function GetAdminPackageCategoriesRepository(): Promise<GetAdminPackageCategoriesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/package-categories`, {
    withCredentials: true,
  });
}

export function GetAdminSettingCateringPackagesRepository(
  query: string
): Promise<GetAdminSettingCateringPackagesResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/catering-packages${query}`,
    {
      withCredentials: true,
    }
  );
}

export function CopyAdminSettingShopProductRepository(
  param: CopyAdminSettingShopProductParam
): Promise<CopyAdminSettingShopProductResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/copy-shop-product`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function GetAdminSettingProductAddonsRepository(
  productId: string
): Promise<GetAdminSettingProductAddonsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/product-addons?productId=${productId}`,
    {
      withCredentials: true,
    }
  );
}

export function GetCustomerSurveyResponseLogsRepository(
  customerSurveyVerificationId: number
): Promise<GetCustomerSurveyResponseLogsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/customer-survey-response-logs/${customerSurveyVerificationId}`,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminCateringStoresRepository(): Promise<GetAdminCateringStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/stores/catering`, {
    withCredentials: true,
  });
}

export function GetAdminSnackshopStoresRepository(): Promise<GetAdminSnackshopStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/stores/snackshop`, {
    withCredentials: true,
  });
}

export function EditAdminSettingStoreRepository(
  param: EditAdminSettingStoreParam
): Promise<EditAdminSettingStoreResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/edit-store`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function GetAdminSettingStoreRepository(
  param: GetAdminSettingStoreParam
): Promise<GetAdminSettingStoreResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/store?store-id=${param.storeId}`,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminDealsRepository(): Promise<GetAdminDealsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/deals`, {
    withCredentials: true,
  });
}

export function GetAdminPackagesRepository(): Promise<GetAdminPackagesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/packages`, {
    withCredentials: true,
  });
}

export function GetAdminStoreLocalesRepository(): Promise<GetAdminStoreLocalesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/locales`, {
    withCredentials: true,
  });
}

export function GetAdminRegionStoreCombinationsRepository(): Promise<GetAdminRegionStoreCombinationsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/region-store-combination`,
    {
      withCredentials: true,
    }
  );
}

export function CreateAdminSettingStoreRepository(
  param: CreateAdminSettingStoreParam
): Promise<CreateAdminSettingStoreResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/admin/setting/store`, param, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
}

export function GetAdminStoreMenusRepository(): Promise<GetAdminStoreMenusResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/store-menu`, {
    withCredentials: true,
  });
}

export function UpdateStoreCateringProductRepository(
  param: UpdateStoreCateringProductParam
): Promise<UpdateStoreCateringProductResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/caters-product`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminTotalSalesRepository(
  param: GetAdminTotalSalesParam
): Promise<GetAdminTotalSalesResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/sales/${param.service}/sum`,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminSalesRepository(
  param: GetAdminSalesParam
): Promise<GetAdminSalesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/sales/${param.service}`, {
    withCredentials: true,
  });
}

export function GetAdminProductsRepository(): Promise<GetAdminProductsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/products`, {
    withCredentials: true,
  });
}

export function GetAdminCateringPackageFlavorsRepository(
  param: GetAdminCateringPackageFlavorsParam
): Promise<GetAdminCateringPackageFlavorsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/catering-package-flavors/${param.packageId}?type=${param.type}`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateAdminSettingShopProductStatusRepository(
  param: UpdateAdminSettingShopProductStatusParam
): Promise<UpdateAdminSettingShopProductStatusResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/shop-product`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function DeleteAdminSettingShopProductRepository(
  productId: string
): Promise<DeleteAdminSettingShopProductResponse> {
  return axios.delete(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/delete-shop-product?id=${productId}`,
    {
      withCredentials: true,
    }
  );
}

export function EditAdminSettingShopProductRepository(
  param: EditAdminSettingShopProductParam
): Promise<EditAdminSettingShopProductResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/edit-shop-product`,
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
    `${REACT_APP_DOMAIN_URL}api/admin/setting/shop-product?product-id=${productId}`,
    {
      withCredentials: true,
    }
  );
}

export function CreateAdminSettingShopProductRepository(
  param: CreateAdminSettingShopProductParam
): Promise<CreateAdminSettingShopProductResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/shop-product`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function GetAdminSettingShopProductsRepository(
  query: string
): Promise<GetAdminSettingShopProductsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/setting/shop-products${query}`,
    {
      withCredentials: true,
    }
  );
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

export function UpdateAdminCateringOrderItemRemarksRepository(
  param: UpdateAdminCateringOrderItemRemarksParam
): Promise<UpdateAdminCateringOrderItemRemarksResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/catering-update-order-item-remarks`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminStoreCateringProductsRepository(
  query: string
): Promise<GetAdminStoreCateringProductsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/availability/caters-product${query}`,
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

export function UpdateAdminSettingUserStoresRepository(
  param: UpdateAdminSettingUserStoresParam
): Promise<UpdateAdminSettingUserStoresResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/admin/setting-user-stores`,
    param,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function GetAdminSettingUserStoreRepository(
  userId: string
): Promise<GetAdminSettingUserStoreResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/setting-user-stores?user_id=${userId}`,
    {
      withCredentials: true,
    }
  );
}

export function GetAdminSettingUserStoresRepository(): Promise<GetAdminSettingUserStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/setting-user-stores`, {
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
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/setting/groups`, {
    withCredentials: true,
  });
}

export function GetAdminUserRepository(
  userId: string
): Promise<GetAdminUserResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/setting/user/${userId}`, {
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
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/setting/users${query}`, {
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
