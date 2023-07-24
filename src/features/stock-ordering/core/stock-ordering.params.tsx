import { DeliverySchedule } from "./domain/delivery-schedule.model";
import { OrderTableData } from "./domain/order-table-row.model";

export interface test {
  test: string;
}

export interface InsertNewOrderParam {
  selectedStoreId: string | undefined;
  selectedAddress: string;
  deliveryScheduleData: string | DeliverySchedule | undefined;
  remarks: string;
  user_id: string;
  category: {
    category_id: string;
    category_name: string;
  };
  OrderData: OrderTableData[];
}

export interface ProductParam {
  category: string;
  store_information: {
    store_id: string;
    store_name: string;
  };
}

export interface currentTab {
  current_tab: number;
  store_id: string[] | undefined;
}

export interface orderID {
  orderId: string;
}

export interface dispatchOrderParam {
  id: string;
  deliveryReceipt: File | string;
  dispatchDeliveryDate: string;
  transport: string;
  remarks: string;
  user_id: string;
  product_data: {
    id: string;
    productId: string;
    dispatchedQuantity: string;
  }[];
}

export interface updateStatus {
  id: string;
  remarks: string;
  user_id: string;
}

export interface newOrdersParam {
  id: string;
  commitedDelivery: string;
  remarks: string;
  user_id: string;
  product_data: {
    id: string;
    productId: string;
    commitedQuantity: string;
  }[];
}

export interface receiveOrdersParam {
  id: string;
  actualDeliveryDate: string;
  updatedDeliveryReceipt: File | string;
  remarks: string;
  user_id: string;
  product_data: {
    id: string;
    productId: string;
    deliveryQuantity: string;
  }[];
}

export interface updateBillingOrderParam {
  id: string;
  billingInformationId: string;
  billingAmount: string;
  remarks: string;
  user_id: string;
}

export interface updateEnRoutePram {
  id: string;
  transport: string;
}

export interface updatePayBillingParam {
  id: string;
  paymentDetailImage: File | string;
  remarks: string;
  user_id: string;
}

export interface updatReviewParam {
  id: string;
  remarks: string;
  user_id: string;
  product_data: {
    id: string;
    productId: string;
    commitedQuantity: string;
  }[];
}

export interface updateDeliveryReceiveApproval {
  id: string;
  status: string;
  user_id: string;
  remarks: string;
}

export interface storeIdParam {
  store_id: string;
}
