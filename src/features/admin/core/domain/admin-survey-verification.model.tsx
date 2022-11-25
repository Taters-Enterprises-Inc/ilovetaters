export interface AdminSurveyVerificationModel {
  id: number;
  order_date: string;
  dateadded: string;
  status: number;
  store_name: string;
  order_no: string | null;
  snackshop_tracking_no: string | null;
  catering_tracking_no: string | null;
  popclub_redeem_code: string | null;
  order_type: string;
}
