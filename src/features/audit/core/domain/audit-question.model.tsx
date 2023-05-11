export interface AuditQuestionModel {
  criteria: Array<{
    questions: number;
    section_name: number;
    sub_section_name: string | null;
    urgency_level: number;
    equivalent_point: number;
  }>;
  section: string | undefined;
}
