import { InfluencerCashoutModel } from "./influencer-cashout.model";

export interface GetAdminInfluencerCashoutsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  influencer_cashouts: Array<InfluencerCashoutModel>;
}
