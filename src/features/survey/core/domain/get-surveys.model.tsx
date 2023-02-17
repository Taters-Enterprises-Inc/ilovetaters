import { SurveyQuestionModel } from "./survey-question.model";

export interface GetSurveysModel {
  section_name: string;
  surveys: Array<SurveyQuestionModel>;
}
