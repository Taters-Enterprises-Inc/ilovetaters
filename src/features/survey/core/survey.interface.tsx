export interface CustomerSurveyQuestionResponseAnswer {
  [key: string]: {
    surveyQuestionOfferedAnswerId?: string;
    otherText?: string;
    surveyQuestionId: number;
  };
}
