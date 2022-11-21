import { AdminSurveyVerificationModel } from "./admin-survey-verification.model";

export interface GetAdminSurveyVerificationsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  surveys: Array<AdminSurveyVerificationModel>;
}
