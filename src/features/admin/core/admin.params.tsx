import { Moment } from "moment";
import { AdminStoreModel } from "./domain/admin-store.model";

export interface EditAdminUserParam {
  userId: string;
  body: {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    groups: Array<number> | null;
  };
}

export interface UpdateStoreDealParam {
  id: string;
  status: "1" | "0";
}

export interface UpdateStoreProductParam {
  id: string;
  status: "1" | "0";
}

export interface UpdateStoreCateringProductParam {
  id: string;
  status: "1" | "0";
}

export interface UpdateStoreCatersPackageParam {
  id: string;
  status: "1" | "0";
}

export interface UpdateStoreCatersPackageAddonParam {
  id: string;
  status: "1" | "0";
}

export interface UpdateStoreCatersProductAddonParam {
  id: string;
  status: "1" | "0";
}

export interface UpdateAdminSettingStoreParam {
  store_id: number;
  name_of_field_status: string;
  status: number;
}
export interface UpdateAdminSettingStoreOperatingHoursParam {
  store_id: string;
  available_start_time: string;
  available_end_time: string;
}

export interface CreateAdminUserParam {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface LoginAdminParam {
  identity: string;
  password: string;
}

export interface AdminPrivilegeParam {
  fbUserId: number | null;
  mobileUserId: number | null;
  password: string;
  transactionId: number;
  transactionHash: string;
  fromStatusId?: number;
  toStatusId?: string;
  fromStoreId?: number;
  toStoreId?: string;
}

export interface ValidateReferenceNumberParam {
  referenceNumber: string;
  transactionId: number;
}

export interface UpdateUserStoresParam {
  userId: string;
  stores: Array<AdminStoreModel>;
}

export interface CreateAdminGroupParam {
  groupName: string;
  description: string;
}

export interface AdminUserDiscountChangeStatusParam {
  discountUserId: number;
  status: number;
}

export interface AdminSurveyVerificationChangeStatusParam {
  surveyVerificationId: number;
  invoiceNo: string;
  status: number;
}

export interface AdminDeclineRedeemParam {
  redeemId: number;
  mobileUserId?: number;
  fbUserId?: number;
}

export interface AdminCompleteRedeemParam {
  redeemId: number;
  mobileUserId?: number;
  fbUserId?: number;
}

export interface AdminCateringBookingUpdateStatusParam {
  transactionId: number;
  transactionHash: string;
  mobileUserId: number | null;
  fbUserId: number | null;
  status: number;
}

export interface AdminShopOrderUpdateStatusParam {
  transactionId: number;
  transactionHash: string;
  mobileUserId: number | null;
  fbUserId: number | null;
  status: number;
}

export interface CreateAdminSettingShopProductParam {
  name: string;
  description: string;
  deliveryDetails: string;
  addDetails: string;
  price: string;
  category: string;
  productType: string;
  uom: string;
  variants: string;
  stores: string;
  products: string;
  numFlavor: string;
  image500x500: File | string;
  image250x250: File | string;
  image150x150: File | string;
  image75x75: File | string;
}

export interface EditAdminSettingShopProductParam {
  id: string;
  name: string;
  description: string;
  deliveryDetails: string;
  addDetails: string;
  price: string;
  category: string;
  uom: string;
  variants: string;
  stores: string;
  products: string;
  numFlavor: string;
  image500x500: File | string;
  image250x250: File | string;
  image150x150: File | string;
  image75x75: File | string;
}

export interface UpdateAdminSettingShopProductStatusParam {
  product_id: number;
  status: number;
}

export interface UpdateAdminCateringOrderItemRemarksParam {
  orderItemId: number;
  remarks: string;
}

export interface GetAdminSalesParam {
  service: "overall" | "snackshop" | "catering" | "popclub";
}

export interface GetAdminTotalSalesParam {
  service: "overall" | "snackshop" | "catering" | "popclub";
}

export interface CreateAdminSettingStoreParam {
  name: string;
  address: string;
  storeMenu: string;
  availableStartTime: string;
  availableEndTime: string;
  phoneNumber: string;
  contactPerson: string;
  email: string;
  deliveryHours: string;
  operatingHours: string;
  lat: number;
  lng: number;
  deliveryRate: string;
  minimumRate: string;
  cateringDeliveryRate: string;
  cateringMinimumRate: string;
  storeHash: string;
  locale: string;
  services: string;
  products: string;
  packages: string;
  image250x250: File | string;
}

export interface GetAdminCateringPackageFlavorsParam {
  packageId: number;
  type: string;
}

export interface GetAdminSettingStoreParam {
  storeId: string;
}

export interface EditAdminSettingStoreParam {
  storeId: string;
  name: string;
  address: string;
  storeMenu: string;
  availableStartTime: string;
  availableEndTime: string;
  phoneNumber: string;
  contactPerson: string;
  email: string;
  deliveryHours: string;
  operatingHours: string;
  region: string;
  activeResellerRegionId: string;
  lat: number;
  lng: number;
  deliveryRate: string;
  minimumRate: string;
  cateringDeliveryRate: string;
  cateringMinimumRate: string;
  storeHash: string;
  locale: string;
  image250x250: File | string;
  services: string;
  products: string;
  packages: string;
}
