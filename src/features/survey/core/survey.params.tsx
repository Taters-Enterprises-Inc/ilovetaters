import { CustomerSurveyQuestionResponseAnswer } from "./survey.interface";

export interface InsertCustomerSurveyResponseParam {
  orderedNo?: string;
  orderedDate?: string;
  storeId?: number;
  service: string | null;
  orderHash: string | null;
  answers: CustomerSurveyQuestionResponseAnswer;
}

export interface GetCustomerSurveyResponseParam {
  hash: string;
  service: "SNACKSHOP" | "CATERING" | "POPCLUB-STORE-VISIT";
}
