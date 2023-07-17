import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { GetStockStoreModel } from "../core/domain/get-stock-store.model";
import { InsertNewOrderModel } from "../core/domain/insert-new-order.model";
import {
  InsertNewOrderParam,
  ProductParam,
  currentTab,
  orderID,
  newOrdersParam,
  updateStatus,
  receiveOrdersParam,
  updateBillingOrderParam,
  updateEnRoutePram,
  updatePayBillingParam,
  dispatchOrderParam,
  updatReviewParam,
  updateDeliveryReceiveApproval,
  storeIdParam,
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

export interface updateNewOrdersResponse {
  data: {
    message: string;
    data: string;
  };
}

export interface updateReviewOrdersResponse {
  data: {
    message: string;
    data: string;
  };
}

export interface updateConfirmOrdersResponse {
  data: {
    message: string;
    data: string;
  };
}

export interface updateDispatchOrdersResponse {
  data: {
    message: string;
    data: string;
  };
}

export interface updateEnrouteOrdersResponse {
  data: {
    message: string;
    data: string;
  };
}

export interface updateReceiveOrdersResponse {
  data: {
    message: string;
    data: string;
  };
}

export interface updateBillingOrdersResponse {
  data: {
    message: string;
    data: string;
  };
}

export interface updatePayBillingOrdersResponse {
  data: {
    message: string;
    data: string;
  };
}

export interface updateConfirmPaymentResponse {
  data: {
    message: string;
    data: string;
  };
}

export interface updateDeliveryReceiveApprovalOrdersResponse {
  data: {
    message: string;
    data: string;
  };
}

export function GetStockOrderStoresRepository(
  store_id: string
): Promise<GetStockOrderStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/stock/order/stores${store_id}`, {
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

export function updateNewOrdersRepository(
  param: newOrdersParam
): Promise<updateNewOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/update-order`, param, {
    withCredentials: true,
  });
}

export function updateReviewOrdersRepository(
  param: updatReviewParam
): Promise<updateReviewOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/review-order`, param, {
    withCredentials: true,
  });
}

export function updateConfirmOrdersRepository(
  param: updateStatus
): Promise<updateConfirmOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/confirm-order`, param, {
    withCredentials: true,
  });
}

export function updateDispatchOrdersRepository(
  param: dispatchOrderParam
): Promise<updateDispatchOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/dispatch-order`, param, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
}

export function updateEnrouteOrdersRepository(
  param: updateEnRoutePram
): Promise<updateEnrouteOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/order-en-route`, param, {
    withCredentials: true,
  });
}

export function updateReceiveOrdersRepository(
  param: receiveOrdersParam
): Promise<updateReceiveOrdersResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/stock/receive-order-delivery`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function updateBillingOrdersRepository(
  param: updateBillingOrderParam
): Promise<updateBillingOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/update-billing`, param, {
    withCredentials: true,
  });
}

export function updatePayBillingOrdersRepository(
  param: updatePayBillingParam
): Promise<updatePayBillingOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/pay-billing`, param, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
}

export function updateConfirmPaymentRepository(
  param: updateStatus
): Promise<updateConfirmPaymentResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/confirm-payment`, param, {
    withCredentials: true,
  });
}

export function updateDeliveryReceiveApprovalOrdersRepository(
  param: updateDeliveryReceiveApproval
): Promise<updateDeliveryReceiveApprovalOrdersResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/stock/order/delivery-receive-approval`,
    param,
    {
      withCredentials: true,
    }
  );
}
