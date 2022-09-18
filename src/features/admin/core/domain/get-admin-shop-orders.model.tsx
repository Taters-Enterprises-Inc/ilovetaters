import { AdminShopOrderModel } from "./admin-shop-order.model";

export interface GetAdminShopOrdersModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  orders: Array<AdminShopOrderModel>;
}
