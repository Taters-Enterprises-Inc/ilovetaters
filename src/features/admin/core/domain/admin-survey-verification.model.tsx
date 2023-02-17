export interface AdminSurveyVerificationModel {
  id: number;
  order_date: string;
  dateadded: string;
  fb_user_id: number;
  mobile_user_id: number;
  user: {
    first_name: string;
    last_name: string;
  };
  status: number;
  store_name: string;
  invoice_no: string;
  snackshop_tracking_no: string | null;
  catering_tracking_no: string | null;
  order_type: string;
  answers: Array<{
    id: number;
    text: string | null;
    others: string | null;
    customer_survey_response_id: number;
    question: string;
    answer: string | null;
  }>;
  ratings: Array<{
    id: number;
    others: string | null;
    customer_survey_response_id: number;
    rate: number;
    question: string;
    name: string;
    lowest_rate_text: string;
    lowest_rate: number;
    highest_rate_text: string;
    highest_rate: number;
  }>;
}
