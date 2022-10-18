import { AdminPopclubRedeemModel } from "./admin-popclub-redeem.model";

export interface GetAdminPopclubRedeemsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  redeems: Array<AdminPopclubRedeemModel>;
}
