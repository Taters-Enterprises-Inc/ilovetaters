export interface AuditEvaluationAnswer {
  [key: string]: {
    question_id: number;
    form_rating_id: string;
    remarks?: string | null;
    equivalent_point: number;
    urgency_level: number;
  };
}
