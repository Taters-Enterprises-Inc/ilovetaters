export interface SurveyQuestionModel {
  id: number;
  description: string;
  is_comment: boolean;
  answers: Array<{
    survey_question_offered_answer_id: number;
    text: string;
  }>;
}
