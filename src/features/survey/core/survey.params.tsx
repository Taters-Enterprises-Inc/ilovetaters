import { CustomerSurveyQuestionResponseAnswer } from "./survey.interface";

export interface InsertCustomerSurveyResponseParam {
  orderedNo?: string;
  orderedDate?: string;
  storeId?: number;
  service?: "snackshop" | "catering";
  orderHash?: string;
  answers: CustomerSurveyQuestionResponseAnswer;
}

export interface GetCustomerSurveyResponseParam {
  hash: string;
}
