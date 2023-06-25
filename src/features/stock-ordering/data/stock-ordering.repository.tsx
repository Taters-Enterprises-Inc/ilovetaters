import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { GetStockStoreModel } from "../core/domain/get-stock-store.model";
import { InsertNewOrderModel } from "../core/domain/insert-new-order.model";
import { InsertNewOrderParam } from "../core/stock-ordering.params";

export interface GetStockOrderStoresResponse {
  data: {
    message: string;
    data: GetStockStoreModel;
  };
}

export interface InsertNewOrderResponse {
  data: {
    message: string;
    data: InsertNewOrderModel;
  };
}

export function GetStockOrderStoresRepository(): Promise<GetStockOrderStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/stock/order/stores`, {
    withCredentials: true,
  });
}

export function InsertNewOrderRepository(
  param: InsertNewOrderParam
): Promise<InsertNewOrderResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/new/order`, param, {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
}
