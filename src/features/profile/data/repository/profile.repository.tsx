import axios from "axios";
import { GetCateringBookingHistoryModel } from "features/profile/core/domain/get-catering-booking-history.model";
import { GetPopclubRedeemsHistoryModel } from "features/profile/core/domain/get-popclub-redeems-history.model";
import { GetSnackShopOrderHistoryModel } from "features/profile/core/domain/get-snackshop-order-history.model";
import { UserDiscountModel } from "features/profile/core/domain/user-discount.model";
import {
  ApplyUserDiscountParam,
  UpdateUserDiscountParam,
} from "features/profile/core/profile.params";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface GetCateringBookingHistoryResponse {
  data: {
    message: string;
    data: GetCateringBookingHistoryModel;
  };
}

export interface GetSnackShopOrderHistoryResponse {
  data: {
    message: string;
    data: GetSnackShopOrderHistoryModel;
  };
}

export interface GetPopclubRedeemsHistoryResponse {
  data: {
    message: string;
    data: GetPopclubRedeemsHistoryModel;
  };
}

export interface ApplyUserDiscountResponse {
  data: {
    message: string;
  };
}

export interface GetUserDiscountResponse {
  data: {
    message: string;
    data: UserDiscountModel;
  };
}

export interface UpdateUserDiscountResponse {
  data: {
    message: string;
  };
}
export function UpdateUserDiscountRepository(
  param: UpdateUserDiscountParam
): Promise<UpdateUserDiscountResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/profile/update-user-discount`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}
export function GetUserDiscountRepository(): Promise<GetUserDiscountResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/profile/user-discount`, {
    withCredentials: true,
  });
}

export function ApplyUserDiscountRepository(
  param: ApplyUserDiscountParam
): Promise<ApplyUserDiscountResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/profile/user-discount`, param, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
}

export function GetPopclubRedeemsHistoryRepository(
  query: string
): Promise<GetPopclubRedeemsHistoryResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/profile/popclub-redeems${query}`,
    {
      withCredentials: true,
    }
  );
}

export function GetSnackShopOrderHistoryRepository(
  query: string
): Promise<GetSnackShopOrderHistoryResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/profile/snackshop-orders${query}`,
    {
      withCredentials: true,
    }
  );
}

export function GetCateringBookingHistoryRepository(
  query: string
): Promise<GetCateringBookingHistoryResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/profile/catering-bookings${query}`,
    {
      withCredentials: true,
    }
  );
}
