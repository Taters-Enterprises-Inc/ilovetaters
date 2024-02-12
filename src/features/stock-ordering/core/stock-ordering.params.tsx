import { OrderTableData } from "./domain/order-table-row.model";
import { categoryModel } from "./domain/store-and-category.model";

export interface test {
  test: string;
}

export interface InsertNewOrderParam {
  selectedStoreId: string | undefined;
  selectedAddress: string;
  deliveryScheduleData: string;
  remarks: string;
  logisticType: string;
  category: categoryModel;
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
  dispatchDeliveryDate: string | null;
  transport: string;
  remarks: string;
  product_data: {
    id: string;
    productId: string;
    // dispatchedQuantity: string;
  }[];
}

export interface updateStatus {
  id: string;
  remarks: string;
  status: string;
}

export interface newOrdersParam {
  id: string;
  commitedDelivery: string | null;
  remarks: string;
  product_data: {
    id: string;
    productId: string;
    commitedQuantity: string | null;
    out_of_stock: boolean | null;
  }[];
}

export interface receiveOrdersParam {
  id: string;
  actualDeliveryDate: string;
  updatedDeliveryReceipt: File | string;
  remarks: string;
  product_data: {
    id: string;
    productId: string;
    deliveryQuantity: string;
  }[];
}

export interface updateBillingOrderParam {
  id: string;
  remarks: string;
  uploadedGoodsReceipt: File | string;
  uploadedRegionReceipt: File | string;
  withNewSI: boolean;
}

export interface updateEnRoutePram {
  id: string;
  transport: string;
}

export interface updatePayBillingParam {
  selectedData: Array<{
    invoice: string | undefined;
    orderId: string | undefined;
  }>;
  paymentFile: File | string;
  remarks: string;
}

export interface updatReviewParam {
  id: string;
  remarks: string;
  status: string;
  product_data: {
    id: string;
    productId: string;
    commitedQuantity: string | null;
  }[];
}

export interface updateDeliveryReceiveApproval {
  id: string;
  status: string;
  remarks: string;
}

export interface storeIdParam {
  store_id: string;
}

export interface updateCancelledStatus {
  id: string;
  remarks: string;
}

export interface updateOrderItemsParam {
  productId: string;
  productName: string;
  uom: string;
  orderQty: string | null;
  order_information_id: string;
}

export interface stockOrderSettingsProductParam {
  productId: string;
  productName: string;
  uom: string;
  categoryType: number | undefined;
  cost: number | null;
  store_id: number[];
}

export interface FranchiseePayBillParam {
  id: string;
  remarks: string;
  uploadedBillingReceipt: File | string;
}
