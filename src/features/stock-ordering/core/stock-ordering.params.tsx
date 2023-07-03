import { OrderTableData } from "./domain/order-table-row.model";

export interface test {
  test: string;
}

export interface InsertNewOrderParam {
  selectedStoreId: string | undefined;
  deliverydate: string;
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
}

export interface orderID {
  orderId: string;
}

export interface dispatchOrderParam {
  id: string;
  deliveryReceipt: File | string;
}

export interface updateStatus {
  id: string;
}

export interface newOrdersParam {
  id: string;
  commitedDelivery: string;
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
  product_data: {
    id: string;
    productId: string;
    deliveryQuantity: string;
  }[];
}
