export interface AuditQuestionModel {
  default_weight: Array<{
    category_id: number,
    type_id: number,
    weight: number
  }>
  question_data: Array<{
    criteria: Array<{
      category_id: number;
      questions: number;
      id: number;
      section_name: number;
      sub_section_name: string | null;
      level: number;
      equivalent_point: number;
    }>;
    section: string | undefined;
  }>;
  
}
