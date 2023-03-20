import { InfluencerDealRedeemModel } from "./influencer-deal-redeem.model";

export interface GetInfluencerDealRedeemsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  deal_redeems: Array<InfluencerDealRedeemModel>;
}
