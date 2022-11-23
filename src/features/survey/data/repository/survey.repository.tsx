import { SurveyQuestionModel } from "features/survey/core/domain/survey-question.model";
import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface GetSurveyResponse {
  data: {
    message: string;
    data: Array<SurveyQuestionModel>;
  };
}

export function GetSurveyRepository(): Promise<GetSurveyResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/survey`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}
