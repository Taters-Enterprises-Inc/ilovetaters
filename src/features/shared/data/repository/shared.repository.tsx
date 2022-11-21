import axios from "axios";
import { SessionModel } from "features/shared/core/domain/session.model";
import { RegionModel } from "features/shared/core/domain/region.model";
import {
  AddContactParam,
  DeleteContactParam,
  DiscountRegistrationParam,
  FacebookLoginPointParam,
  ForgotPasswordGenerateOtpParam,
  ForgotPasswordNewPasswordOtpParam,
  ForgotPasswordValidateOTPParam,
  GetStoresAvailableParam,
  SetSessionParam,
  SetStoreAndAddressParm,
  SignInMobileUserParam,
  SignUpMobileUserParam,
  UpdateContactParam,
  UploadProofOfPaymentParam,
} from "features/shared/core/shared.params";
import { REACT_APP_DOMAIN_URL } from "../../constants";
import { UserDiscountModel } from "features/shared/core/domain/user-discount.model";
import { StoreModel } from "features/shared/core/domain/store.model";
import { CompanyModel } from "features/shared/core/domain/company.model";
import { GetNotificationsModel } from "features/shared/core/domain/get-notifications.model";
import { ContactModel } from "features/shared/core/domain/contact.model";

export interface GetStoresAvailableResponse {
  data: {
    message: string;
    data: Array<RegionModel>;
  };
}

export interface SetStoreAndAddressResponse {
  data: {
    message: string;
  };
}

export interface GetSessionResponse {
  data: {
    data: SessionModel;
    message: string;
  };
}

export interface SetSessionResponse {
  data: {
    message: string;
  };
}

export interface FacebookLoginResponse {
  data: {
    message: string;
    url: string;
    result: boolean;
  };
}

export interface FacebookLoginPointResponse {
  data: {
    message: string;
  };
}

export interface FacebookLogoutResponse {
  data: {
    message: string;
  };
}

export interface StoreResetResponse {
  data: {
    message: string;
  };
}

export interface UploadProofOfPaymentResponse {
  data: {
    message: string;
  };
}

export interface GetContactsResponse {
  data: {
    message: string;
    data: Array<ContactModel>;
  };
}

export interface AddContactResponse {
  data: {
    message: string;
  };
}

export interface DeleteContactResponse {
  data: {
    message: string;
  };
}

export interface UpdateContactResponse {
  data: {
    message: string;
  };
}

export interface SignInMobileUserResponse {
  data: {
    message: string;
  };
}

export interface SignUpMobileUserResponse {
  data: {
    message: string;
  };
}

export interface ForgotPasswordGenerateOTPResponse {
  data: {
    message: string;
  };
}

export interface ForgotPasswordValidateOTPResponse {
  data: {
    message: string;
  };
}

export interface ForgotPasswordNewPasswordResponse {
  data: {
    message: string;
  };
}

export interface DiscountRegistrationResponse {
  data: {
    message: string;
  };
}
export interface GetNotificationsResponse {
  data: {
    message: string;
    data: GetNotificationsModel;
  };
}

export interface SeenNotificationResponse {
  data: {
    message: string;
  };
}

export interface GetAvailableUserDiscountResponse {
  data: {
    message: string;
    data: UserDiscountModel;
  };
}

export interface GetAllStoresResponse {
  data: {
    message: string;
    data: Array<{
      store_id: number;
      name: string;
      menu_name: string;
    }>;
  };
}

export interface GetAllCompaniesResponse {
  data: {
    message: string;
    data: Array<CompanyModel>;
  };
}

export function GetAllCompaniesRepository(): Promise<GetAllCompaniesResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/shared/companies`, {
    withCredentials: true,
  });
}

export function GetAllStoresRepository(): Promise<GetAllStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/shared/stores`, {
    withCredentials: true,
  });
}

export function GetAvailableUserDiscountRepository(): Promise<GetAvailableUserDiscountResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/shared/available-user-discount`,
    {
      withCredentials: true,
    }
  );
}

export function SeenNotificationRepository(
  notificationId: number
): Promise<SeenNotificationResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/notification/${notificationId}/seen`,
    {
      withCredentials: true,
    }
  );
}

export function GetNotificationsRepository(): Promise<GetNotificationsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/notification`, {
    withCredentials: true,
  });
}

export function ForgotPasswordNewPasswordRepository(
  param: ForgotPasswordNewPasswordOtpParam
): Promise<ForgotPasswordNewPasswordResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/mobile_users/change_password`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function ForgotPasswordValidateOTPRepository(
  param: ForgotPasswordValidateOTPParam
): Promise<ForgotPasswordValidateOTPResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/mobile_users/validate_otp_code`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function ForgotPasswordGenerateOTPRepository(
  param: ForgotPasswordGenerateOtpParam
): Promise<ForgotPasswordGenerateOTPResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/mobile_users/mobile_generate_forgot_pass_code`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function SignUpMobileUserRepository(
  param: SignUpMobileUserParam
): Promise<SignUpMobileUserResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/mobile_users/registration`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function SignInMobileUserRepository(
  param: SignInMobileUserParam
): Promise<SignInMobileUserResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/mobile_users/login_mobile_user`,
    param,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function UpdateContactRepository(
  param: UpdateContactParam
): Promise<UpdateContactResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/profile/contact/${param.id}`,
    param.body,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function DeleteContactRepository(
  param: DeleteContactParam
): Promise<DeleteContactResponse> {
  return axios.delete(
    `${REACT_APP_DOMAIN_URL}api/profile/contact/${param.id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function AddContactRepository(
  param: AddContactParam
): Promise<AddContactResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/shared/contacts`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetContactsRepository(): Promise<GetContactsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/shared/contacts`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function UploadProofOfPaymentRepository(
  param: UploadProofOfPaymentParam
): Promise<UploadProofOfPaymentResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/shared/upload_payment/`,
    param.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function DiscountRegistrationRepository(
  param: FormData
): Promise<DiscountRegistrationResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/shared/discount_registration/`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function StoreResetRepository(): Promise<StoreResetResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/store/reset/`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function FacebookLogoutRepository(): Promise<FacebookLogoutResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/facebook/logout/`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function FacebookLoginPointRepository(
  param: FacebookLoginPointParam
): Promise<FacebookLoginPointResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/facebook/login_point/`,
    {
      fb_login_point: param.currentUrl,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function FacebookLoginRepository(): Promise<FacebookLoginResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/facebook/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetStoresAvailableRepository(
  param: GetStoresAvailableParam
): Promise<GetStoresAvailableResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/store?${
      param.address ? `address=${encodeURIComponent(param.address)}` : ""
    }&service=${param.service}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function SetStoreAndAddressRepository(
  param: SetStoreAndAddressParm
): Promise<GetStoresAvailableResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/store`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetSessionRepository(): Promise<GetSessionResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/shared/session`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function SetSessionRepository(
  param: SetSessionParam
): Promise<GetSessionResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/shared/session`,
    { session: param },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}
