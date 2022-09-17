import { AdminSnackshopOrderModel } from "./admin-snackshop-order.model";

export interface GetAdminSnackshopOrdersModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  orders: Array<AdminSnackshopOrderModel>;
}
