import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  LoginAuditParam,
  UpdateAuditSettingsQuestionParam,
} from "../core/audit.params";
import { GetAuditSettingsQuestionsModel } from "../core/domain/get-audit-settings-questions.model";

export interface LoginAuditResponse {
  data: {
    message: string;
  };
}

export interface LogoutAuditResponse {
  data: {
    message: string;
  };
}

export interface GetAuditSettingQuestionsResponse {
  data: {
    message: string;
    data: GetAuditSettingsQuestionsModel;
  };
}

export interface UpdateAuditSettingsQuestionResponse {
  data: {
    message: string;
  };
}

// Repository

export function LoginAuditRepository(
  param: LoginAuditParam
): Promise<LoginAuditResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/audit/login`, param, {
    withCredentials: true,
  });
}

export function LogoutAuditRepository(): Promise<LogoutAuditResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/audit/logout`, {
    withCredentials: true,
  });
}

export function GetAuditSettingQuestionsRepository(
  query: string
): Promise<GetAuditSettingQuestionsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/audit/settings/auditformquestions${query}`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateAuditSettingsQuestionRepository(
  param: UpdateAuditSettingsQuestionParam
): Promise<UpdateAuditSettingsQuestionResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/audit/settings/auditformquestions`,
    param,
    {
      withCredentials: true,
    }
  );
}
