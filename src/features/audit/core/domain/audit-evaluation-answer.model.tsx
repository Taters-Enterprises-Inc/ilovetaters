export interface AuditEvaluationAnswer {
  [key: string]: {
    question_id: number;
    form_rating_id: string;
    remarks?: string;
  };
}
