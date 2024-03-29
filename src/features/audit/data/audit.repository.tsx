import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  GetAuditResponseParam,
  InsertAuditAcknowledgeParam,
  InsertAuditResponseParam,
  LoginAuditParam,
  UpdateAuditSettingsQuestionParam,
} from "../core/audit.params";
import { GetAuditSettingsQuestionsModel } from "../core/domain/get-audit-settings-questions.model";
import { GetAuditStoreModel } from "../core/domain/get-store-model.model";
import { AuditQuestionModel } from "../core/domain/audit-question.model";
import { InsertAuditResponseModel } from "../core/domain/insert-audit-response.model";
import { GetAuditResponseModel } from "../core/domain/audit-response.model";
import { GetAuditResponseInformationQualityAuditInformationModel } from "../core/domain/get-audit-response-quality-audit-information.model";
import { GetAuditStoreResultModel } from "../core/domain/audit-store-result.model";

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

export interface GetStoresResponse {
  data: {
    message: string;
    data: GetAuditStoreModel;
  };
}

export interface GetAuditEvaluationFormQuestionResponse {
  data: {
    message: string;
    data: AuditQuestionModel;
  };
}

export interface InsertAuditResponseResponse {
  data: {
    message: string;
    data: InsertAuditResponseModel;
  };
}

export interface GetAuditResponseResponse {
  data: {
    message: string;
    data: GetAuditResponseModel;
  };
}

export interface GetAuditResponseInformationQualityAuditInformationResponse {
  data: {
    message: string;
    data: GetAuditResponseInformationQualityAuditInformationModel;
  };
}

export interface GetAuditStoreResultResponse {
  data: {
    message: string;
    data: GetAuditStoreResultModel;
  };
}

export interface GetAuditAcknowledgeResponse {
  data: {
    message: string;
    data: InsertAuditResponseModel;
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

export function GetStoresRepository(): Promise<GetStoresResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/audit/stores`, {
    withCredentials: true,
  });
}

export function GetAuditEvaluationFormQuestionRepository(
  query: string
): Promise<GetAuditEvaluationFormQuestionResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/audit/evaluation${query}`, {
    withCredentials: true,
  });
}

export function InsertAuditResponseRepository(
  param: InsertAuditResponseParam
): Promise<InsertAuditResponseResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/audit/evaluation`, param, {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetAuditResponseRepository(
  param: GetAuditResponseParam
): Promise<GetAuditResponseResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/audit/response/answer/${param.hash}`,
    {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function GetAuditResponseInformationQualityAuditInformationRepository(
  query: string
): Promise<GetAuditResponseInformationQualityAuditInformationResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/audit/response/quality/audit/information${query}`,
    {
      withCredentials: true,
    }
  );
}

export function GetAuditStoreResultRepository(
  query: string
): Promise<GetAuditStoreResultResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/audit/result${query}`, {
    withCredentials: true,
  });
}

export function GetAuditAcknowledgeRepository(
  param: InsertAuditAcknowledgeParam
): Promise<GetAuditAcknowledgeResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/audit/response/answer/${param.hash}`,
    param,
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}
