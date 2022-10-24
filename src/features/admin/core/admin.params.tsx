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
  password: string;
  transactionId: number;
  fromStatusId?: number;
  toStatusId?: string;
  fromStoreId?: number;
  toStoreId?: string;
}

export interface ValidateReferenceNumberParam {
  referenceNumber: string;
  transactionId: number;
}
