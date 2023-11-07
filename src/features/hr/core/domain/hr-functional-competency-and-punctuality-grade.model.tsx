export interface HrFunctionalCompetencyAndPunctualityGradeModel {
  functional_competency_and_punctuality_grade: Array<{
    id: number;
    title: string;
    description: string;

    // CUSTOM FIELDS
    critical_incidents_or_comments?: string;
    rating?: string;
  }>;

  // CUSTOM FIELDS
  attendance_and_punctuality_grade?: {
    absences?: string;
    tardiness?: string;
  };
}
