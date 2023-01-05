export interface EditAdminUserParam {
  formData: FormData;
  userId: string;
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

export interface GetAdminCateringPackageFlavorsParam {
  packageId: number;
  type: string;
}
