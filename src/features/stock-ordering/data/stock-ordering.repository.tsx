import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { GetStockStoreModel } from "../core/domain/get-stock-store.model";
import { InsertNewOrderModel } from "../core/domain/insert-new-order.model";
import {
  InsertNewOrderParam,
  ProductParam,
  currentTab,
  orderID,
  reviewOrdersParam,
} from "../core/stock-ordering.params";
import { GetStockProductModel } from "../core/domain/get-stock-product.model";
import { GetStockOrdersModel } from "../core/domain/get-stock-orders.model";
import { GetProductDataModel } from "../core/domain/get-product-data.model";

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

export interface GetStockOrdersResponse {
  data: {
    message: string;
    data: GetStockOrdersModel;
  };
}

export interface GetProductDataResponse {
  data: {
    message: string;
    data: GetProductDataModel;
  };
}

export interface updateReviewOrdersResponse {
  data: {
    message: string;
    data: string;
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
  return axios.get(`${REACT_APP_DOMAIN_URL}api/stock/order/products`, {
    params: param,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetStockOrdersRepository(
  query: string,
  param: currentTab
): Promise<GetStockOrdersResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/stock/orders${query}`, {
    params: param,
    withCredentials: true,
  });
}

export function GetProductDataRepository(
  param: orderID
): Promise<GetProductDataResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/stock/ordered/products`, {
    params: param,
    withCredentials: true,
  });
}

export function updateReviewOrdersRepository(
  param: reviewOrdersParam
): Promise<updateReviewOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/update-order`, param, {
    withCredentials: true,
  });
}
