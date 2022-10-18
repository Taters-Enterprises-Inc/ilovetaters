import { AdminUserDiscountModel } from "./admin-user-discount.model";

export interface GetAdminUserDiscountsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  request: Array<AdminUserDiscountModel>;
}
