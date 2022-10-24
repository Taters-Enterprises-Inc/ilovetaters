import axios from "axios";
import { BscSessionModel } from "features/bsc/core/domain/bsc-session.model";
import { BscStoreModel } from "features/bsc/core/domain/bsc-store.model";
import { UserModel } from "features/bsc/core/domain/bsc-user.model";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface LoginBscResponse {
  data: {
    message: string;
  };
}
export interface GetBscSessionResponse {
  data: {
    message: string;
    data: BscSessionModel;
  };
}

export interface GetBscUsersResponse {
  data: {
    message: string;
    data: Array<UserModel>;
  };
}

export interface GetBscUserResponse {
  data: {
    message: string;
    data: UserModel;
  };
}

export interface GetBscUserStoresResponse {
  data: {
    message: string;
    data: Array<BscStoreModel>;
  };
}

export interface GetBscStoresResponse {
  data: {
    message: string;
    data: Array<BscStoreModel>;
  };
}

export interface UpdateBscUserStoresResponse {
  data: {
    message: string;
  };
}

export interface LogoutBscResponse {
  data: {
    message: string;
  };
}

export function GetBscSessionRepository(): Promise<GetBscSessionResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/bsc/session`, {
    withCredentials: true,
  });
}

export function LoginBscRepository(param: FormData): Promise<LoginBscResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/auth-bsc/login`, param, {
    withCredentials: true,
  });
}

export function LogoutBscRepository(): Promise<LogoutBscResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/auth-bsc/logout`, {
    withCredentials: true,
  });
}

export function GetBscUsersRepository(
  query: string
): Promise<GetBscUsersResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/users${query}`, {
    withCredentials: true,
  });
}

export function GetBscUserRepository(
  userId: string
): Promise<GetBscUserResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/admin/user/${userId}`, {
    withCredentials: true,
  });
}

export function GetBscUserStoresRepository(
  userId: string
): Promise<GetBscUserStoresResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/stores?user_id=${userId}`,
    {
      withCredentials: true,
    }
  );
}

export function GetBscStoreRepository(
  storeId: string
): Promise<GetBscStoresResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/admin/store?store_id=${storeId}`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateBscUserStoresRepository(
  formData: FormData
): Promise<GetBscUserStoresResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/admin/stores`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}