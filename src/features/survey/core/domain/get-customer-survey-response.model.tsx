export interface GetCustomerSurveyResponseModel {
  id: number;
  order_date: string;
  invoice_no: string;
  store_name: string;
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
