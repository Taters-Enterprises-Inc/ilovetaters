export interface DeleteContactParam {
  id: number;
}
export interface UpdateContactParam {
  id: number;

  body: {
    contact: string;
  };
}
export interface AddContactParam {
  contact: string;
}

export interface UploadProofOfPaymentParam {
  formData: FormData;
}

export interface DiscountRegistrationParam {
  formData: FormData;
}

export interface GetStoresAvailableParam {
  hash?: string;
  address: string | null;
  service:
    | "SNACKSHOP"
    | "CATERING"
    | "BRANCHES"
    | "POPCLUB-STORE-VISIT"
    | "POPCLUB-ONLINE-DELIVERY";
}

export interface SetStoreAndAddressParm {
  address: string | null;
  storeId: number;
  regionId: number;
  service: "SNACKSHOP" | "CATERING" | "POPCLUB";
  cateringStartDate?: Date;
  cateringEndDate?: Date;
}

export interface SetSessionParam {
  customer_address?: string | null;
  cache_data?: any;
}

export interface FacebookLoginPointParam {
  currentUrl: string;
}

export interface SignInMobileUserParam {
  phoneNumber: string;
  password: string;
}

export interface SignUpMobileUserParam {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ForgotPasswordGenerateOtpParam {
  phoneNumber: string;
}

export interface ForgotPasswordValidateOTPParam {
  phoneNumber: string;
  otpCode: string;
}

export interface ForgotPasswordNewPasswordOtpParam {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface GetCustomerSurveyResponseInOrderServiceParam {
  hash: string;
  service: "snackshop" | "catering";
}
