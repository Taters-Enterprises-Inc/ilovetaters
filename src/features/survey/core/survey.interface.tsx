export interface CustomerSurveyQuestionResponseAnswer {
  [key: string]: {
    surveyQuestionId: number;
    surveyQuestionAnswerId?: string;
    surveyQuestionRatingId?: string;
    rate?: string;
    text?: string;
    others?: string;
  };
}
