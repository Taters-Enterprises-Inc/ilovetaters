export interface SurveyQuestionModel {
  id: number;
  description: string;
  is_text_field: boolean;
  is_text_area: boolean;
  answers: Array<{
    id: number;
    survey_question_offered_answer_id: number;
    text: string;
  }>;
}
