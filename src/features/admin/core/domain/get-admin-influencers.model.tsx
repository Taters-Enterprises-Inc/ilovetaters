import { AdminInfluencerModel } from "./admin-influencer.model";

export interface GetAdminInfluencersModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  influencers: Array<AdminInfluencerModel>;
}
