import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { GetStockStoreModel } from "../core/domain/get-stock-store.model";
import { InsertNewOrderModel } from "../core/domain/insert-new-order.model";
import {
  InsertNewOrderParam,
  ProductParam,
} from "../core/stock-ordering.params";
import { GetStockProductModel } from "../core/domain/get-stock-product.model";

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

export interface GetStockOrderProductsResponse {
  data: {
    message: string;
    data: GetStockProductModel;
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

export function GetStockOrderProductsRepository(
  param: ProductParam
): Promise<GetStockOrderProductsResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/order/products`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}
