import { CustomerSurveyQuestionResponseAnswer } from "./survey.interface";

export interface InsertCustomerSurveyResponseParam {
  orderedNo?: string;
  orderedDate?: string;
  storeId?: number;
  service: string | null;
  orderHash: string | null;
  answers: CustomerSurveyQuestionResponseAnswer;
}
