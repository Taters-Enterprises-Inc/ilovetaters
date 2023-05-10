export interface AuditQuestionModel {
  questions: {
    audit_type_id: number;
    audit_type_name: string;
    equivalent_point: string;
    question_id: string | null;
    questions: number;
    section_id: number;
    section_name: number;
    sub_section_id: number | null;
    sub_section_name: string | null;
    urgency_level: number;
  };
}
