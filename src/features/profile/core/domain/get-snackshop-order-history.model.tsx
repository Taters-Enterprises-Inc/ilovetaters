import { SnackShopOrderModel } from "./snackshop-order.model";

export interface GetSnackShopOrderHistoryModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  orders: Array<SnackShopOrderModel>;
}
