import { OrderTableData } from "./order-table-row.model";

export interface InsertNewOrderModel {
  selectedstore: string;
  deliverydate: string;
  [category: string]: OrderTableData[] | string;
}
