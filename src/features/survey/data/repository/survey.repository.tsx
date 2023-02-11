import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  GetCustomerSurveyResponseParam,
  InsertCustomerSurveyResponseParam,
} from "features/survey/core/survey.params";
import { GetCustomerSurveyResponseModel } from "features/survey/core/domain/get-customer-survey-response.model";
import axios from "axios";
import { InsertCustomerSurveyResponseModel } from "features/survey/core/domain/insert-customer-survey-response.model";
import { GetSurveysModel } from "features/survey/core/domain/get-surveys.model";

export interface GetSurveyResponse {
  data: {
    message: string;
    data: Array<GetSurveysModel>;
  };
}

export interface InsertCustomerSurveyResponseResponse {
  data: {
    message: string;
    data: InsertCustomerSurveyResponseModel;
  };
}

export interface GetCustomerSurveyResponseResponse {
  data: {
    message: string;
    data: GetCustomerSurveyResponseModel;
  };
}

export function GetCustomerSurveyResponseRepository(
  param: GetCustomerSurveyResponseParam
): Promise<GetCustomerSurveyResponseResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/survey/answer/${param.hash}`, {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
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
