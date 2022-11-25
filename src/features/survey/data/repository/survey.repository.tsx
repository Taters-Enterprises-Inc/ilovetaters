import { SurveyQuestionModel } from "features/survey/core/domain/survey-question.model";
import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { InsertCustomerSurveyResponseParam } from "features/survey/core/survey.params";

export interface GetSurveyResponse {
  data: {
    message: string;
    data: Array<SurveyQuestionModel>;
  };
}

export interface InsertCustomerSurveyResponseResponse {
  data: {
    message: string;
  };
}

export function InsertCustomerSurveyResponseRepository(
  param: InsertCustomerSurveyResponseParam
): Promise<InsertCustomerSurveyResponseResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/survey`, param, {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetSurveyRepository(): Promise<GetSurveyResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/survey`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}
