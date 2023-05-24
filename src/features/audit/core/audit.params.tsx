import { AuditEvaluationAnswer } from "./domain/audit-evaluation-answer.model";
import { AuditResultModel } from "./domain/audit-result.model";

export interface LoginAuditParam {
  identity: string;
  password: string;
}

export interface UpdateAuditSettingsQuestionParam {
  id: number;
  status: number;
  type: "point" | "status";
}

export interface InsertAuditResponseParam {
  selectedStoreId?: number;
  selectedTypeId?: number;
  attention: string;
  period: string;
  answers: AuditEvaluationAnswer;
  result: AuditResultModel;
}

export interface GetAuditResponseParam {
  hash: string;
}
