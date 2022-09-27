import { PopclubRedeemModel } from "./popclub-redeem.model";

export interface GetPopclubRedeemsHistoryModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  redeems: Array<PopclubRedeemModel>;
}
