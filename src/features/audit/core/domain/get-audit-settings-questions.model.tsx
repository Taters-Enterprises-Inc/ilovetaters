export interface GetAuditSettingsQuestionsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  questions: Array<{
    id: number;
    questions: string;
    section_name: string;
    sub_section_name: string | null;
    total_point: number;
    status: number;
  }>;
}
