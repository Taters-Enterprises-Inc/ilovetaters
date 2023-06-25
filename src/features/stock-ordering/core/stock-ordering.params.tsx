import { OrderTableData } from "./domain/order-table-row.model";

export interface test {
  test: string;
}

export interface InsertNewOrderParam {
  selectedStoreId: string | undefined;
  deliverydate: string;
  category: string;
  OrderData: OrderTableData[];
}
