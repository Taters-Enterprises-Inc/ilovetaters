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
  updateEnRoutePram,
  updatePayBillingParam,
  dispatchOrderParam,
  updatReviewParam,
  updateDeliveryReceiveApproval,
  updateCancelledStatus,
  updateBillingOrderParam,
  updateOrderItemsParam,
  stockOrderSettingsProductParam,
  FranchiseePayBillParam,
  updatePenelizedPayBillingParam,
} from "../core/stock-ordering.params";
import { GetStockProductModel } from "../core/domain/get-stock-product.model";
import { GetStockOrdersModel } from "../core/domain/get-stock-orders.model";
import { GetProductDataModel } from "../core/domain/get-product-data.model";
import { GetPayBillingSiModel } from "../core/domain/get-pay-billing-si.model";
import { DeliveryScheduleModel } from "../core/domain/delivery-schedule.model";
import { OrderTableData } from "../core/domain/order-table-row.model";
import { OverdueTaskModel } from "../core/domain/overdue-task.model";
import { StockOrderingSettingsProducts } from "../core/domain/stock-ordering-all-products.model";
import { StockOrderProductModel } from "../core/domain/stock-order-product.model";
import { StockOrderAllStoreModel } from "../core/domain/stock-order-all-store.model";

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

export interface updateOrderCancelledResponse {
  data: {
    message: string;
    data: string;
  };
}

export interface GetPayBillingSiResponse {
  data: {
    message: string;
    data: GetPayBillingSiModel;
  };
}
export interface GetDeliveryScheduleResponse {
  data: {
    message: string;
    data: Array<DeliveryScheduleModel>;
  };
}

export interface updateOrderItemsResponse {
  data: {
    message: string;
  };
}

export interface GetStockOrderSettingProductsResponse {
  data: {
    message: string;
    data: StockOrderingSettingsProducts;
  };
}

export interface stockOrderCreateProductResponse {
  data: {
    message: string;
  };
}

export interface GetStockOrderSettingProductsEditResponse {
  data: {
    message: string;
    data: StockOrderProductModel;
  };
}

export interface GetStockOrderAllStoresResponse {
  data: {
    message: string;
    data: StockOrderAllStoreModel;
  };
}

export interface stockOrderEditProductResponse {
  data: {
    message: string;
  };
}

export interface stockOrderActiveStatusResponse {
  data: {
    message: string;
  };
}

export interface updateFranchiseePayBillResponse {
  data: {
    message: string;
  };
}

export interface updatePenalizedPayBillingOrdersResponse {
  data: {
    message: string;
  };
}

export function GetStockOrderStoresRepository(
  store_id: string
): Promise<GetStockOrderStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/stock/order/stores${store_id}`, {
    withCredentials: true,
  });
}

export interface GetOverdueTaskResponse {
  data: {
    message: string;
    data: Array<OverdueTaskModel>;
  };
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
  query: string
): Promise<GetStockOrdersResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/stock/orders${query}`, {
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
    headers: {
      "Content-Type": "multipart/form-data",
    },
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

export function updateOrderCancelledRepository(
  param: updateCancelledStatus
): Promise<updateOrderCancelledResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/stock/cancelled`, param, {
    withCredentials: true,
  });
}

export function GetPayBillingSiRepository(
  param: string
): Promise<GetPayBillingSiResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/stock/pay-billing${param}`, {
    withCredentials: true,
  });
}

export function GetDeliveryScheduleRepository(): Promise<GetDeliveryScheduleResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/stock/schedule/delivery`, {
    withCredentials: true,
  });
}

export function updateOrderItemsRepository(
  param: updateOrderItemsParam[]
): Promise<GetPayBillingSiResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/stock/update/order-items`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function GetOverdueTaskRepository(): Promise<GetOverdueTaskResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/stock/get/overdue-task`, {
    withCredentials: true,
  });
}

export function GetStockOrderSettingProductsRepository(
  param: string
): Promise<GetStockOrderSettingProductsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/stock/settings/products${param}`,
    {
      withCredentials: true,
    }
  );
}

export function stockOrderCreateProductRepository(
  param: stockOrderSettingsProductParam
): Promise<stockOrderCreateProductResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/stock/settings/create-product`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function GetStockOrderSettingProductsEditRepository(
  param: string
): Promise<GetStockOrderSettingProductsEditResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/stock/settings/edit-product/${param}`,

    {
      withCredentials: true,
    }
  );
}

export function GetStockOrderAllStoresRepository(): Promise<GetStockOrderAllStoresResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/stock/settings/all-store`,

    {
      withCredentials: true,
    }
  );
}

export function stockOrderEditProductRepository(param: {
  id: string;
  productData: stockOrderSettingsProductParam;
}): Promise<stockOrderEditProductResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/stock/settings/edit-product/${param.id}`,
    param.productData,
    {
      withCredentials: true,
    }
  );
}

export function stockOrderActiveStatusRepository(param: {
  id: string;
  active_status: boolean;
}): Promise<stockOrderActiveStatusResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/stock/settings/product-status`,
    param,
    {
      withCredentials: true,
    }
  );
}

export function updateFranchiseePayBillRepository(
  param: FranchiseePayBillParam
): Promise<updateFranchiseePayBillResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/stock/order/franchisee-pay-bill`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function updatePenalizedPayBillingOrdersRepository(
  param: updatePenelizedPayBillingParam
): Promise<updatePenalizedPayBillingOrdersResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/stock/order/stock/order/penalized-pay-bill`,
    param,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}
