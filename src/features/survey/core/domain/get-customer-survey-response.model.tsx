export interface GetCustomerSurveyResponseModel {
  id: number;
  order_date: string;
  answers: Array<{
    id: number;
    other_text: string | null;
    customer_survey_response_id: number;
    question: string;
    answer: string | null;
  }>;
}
