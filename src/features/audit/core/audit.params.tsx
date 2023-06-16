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
  selectedStoreId?: string;
  selectedTypeId?: string;
  attention: string;
  auditorName: string;
  period: string;
  date: string;
  answers: AuditEvaluationAnswer;
  result: AuditResultModel;
}

export interface InsertAuditAcknowledgeParam {
  acknowledgeby: string;
  image: string | File;
  hash: string;
}

export interface GetAuditResponseParam {
  hash: string;
}
