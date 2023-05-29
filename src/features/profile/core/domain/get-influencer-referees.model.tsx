import { InfluencerRefereeModel } from "./influencer-referee.model";

export interface GetInfluencerRefereesModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  referees: Array<InfluencerRefereeModel>;
}
