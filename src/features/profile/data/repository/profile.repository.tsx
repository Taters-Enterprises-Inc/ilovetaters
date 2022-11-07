import axios from "axios";
import { GetCateringBookingHistoryModel } from "features/profile/core/domain/get-catering-booking-history.model";
import { GetPopclubRedeemsHistoryModel } from "features/profile/core/domain/get-popclub-redeems-history.model";
import { GetSnackShopOrderHistoryModel } from "features/profile/core/domain/get-snackshop-order-history.model";
import { UpdateIndicatorOrderParam } from "features/profile/core/shared.params";
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

export interface UpdateIndicatorOrderResponse {
  data: {
    message: string;
  };
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

export function UpdateIndicatorOrderRepository(
  param: UpdateIndicatorOrderParam
): Promise<UpdateIndicatorOrderResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/profile/snackshop-orders`,
    param,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}
