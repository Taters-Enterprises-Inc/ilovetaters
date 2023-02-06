import { SurveyAnswerModel } from "./survey-answer.model";
import { SurveyRatingModel } from "./survey-rating.model";

export interface SurveyQuestionModel {
  id: number;
  description: string;
  is_text_field: boolean;
  is_text_area: boolean;
  others: boolean;
  answers: Array<SurveyAnswerModel>;
  ratings: Array<SurveyRatingModel>;
}
