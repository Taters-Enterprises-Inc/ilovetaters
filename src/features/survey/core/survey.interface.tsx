export interface CustomerSurveyQuestionResponseAnswer {
  [key: string]: {
    surveyQuestionId: number;
    surveyQuestionAnswerId?: string;
    otherText?: string;
  };
}
