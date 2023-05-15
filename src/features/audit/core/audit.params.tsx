import { AuditEvaluationAnswer } from "./domain/audit-evaluation-answer.model";

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
  answers: AuditEvaluationAnswer;
}

export interface GetAuditResponseParam {
  hash: string;
}
