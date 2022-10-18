import { AdminDiscountVerificationModel } from "./get-admin-discount-verification.model";

export interface GetAdminDiscountVerificationsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  request: Array<AdminDiscountVerificationModel>;
}
