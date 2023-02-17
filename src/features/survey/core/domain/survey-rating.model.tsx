export interface SurveyRatingModel {
  id: number;
  name: string;
  description: string;
  survey_question_offered_rating_id: number;
  lowest_rate_text: string;
  lowest_rate: number;
  highest_rate_text: string;
  highest_rate: number;
}
