import { AuditQuestionModel } from "./audit-question.model";

export interface AuditEvaluationFormModel {
  Community: Array<AuditQuestionModel>;
  Inline: Array<AuditQuestionModel>;
  Kiosk: Array<AuditQuestionModel>;
  Lifestyle: Array<AuditQuestionModel>;
}
