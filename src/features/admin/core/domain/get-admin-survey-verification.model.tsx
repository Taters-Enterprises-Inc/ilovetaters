import { AdminSurveyVerificationModel } from "./admin-survey-verification.model";

export interface GetAdminSurveyVerificationModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  surveyverification: Array<AdminSurveyVerificationModel>;
}
