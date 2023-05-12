export interface AuditQuestionModel {
  criteria: Array<{
    questions: number;
    id: number;
    section_name: number;
    sub_section_name: string | null;
    level: number;
    equivalent_point: number;
  }>;
  section: string | undefined;
}
