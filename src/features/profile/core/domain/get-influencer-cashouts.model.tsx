import { ProfileCashoutModel } from "./profile-cashout.model";

export interface GetInfluencerCashoutsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  cashouts: Array<ProfileCashoutModel>;
}
