export interface GetCustomerSurveyResponseModel {
  id: number;
  order_date: string;
  answers: Array<{
    id: number;
    survey_question_offered_answer_id: number;
    survey_question_id: number;
    other_text: string | null;
    customer_survey_response_id: number;
  }>;
}
