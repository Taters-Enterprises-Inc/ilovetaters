export interface HrCoreCompetencyGradeModel {
  core_competency_grade: Array<{
    id: number;
    title: string;
    description: string;

    // CUSTOM FIELDS
    critical_incidents_or_comments?: string;
    rating?: string;
  }>;
}
