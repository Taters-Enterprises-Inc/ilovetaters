import { AdminInfluencerApplicationModel } from "./admin-influencer-application.model";

export interface GetAdminInfluencerApplicationsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  influencer_applications: Array<AdminInfluencerApplicationModel>;
}
