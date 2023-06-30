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
