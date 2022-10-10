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

export interface UpdateStorePackageParam {
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
