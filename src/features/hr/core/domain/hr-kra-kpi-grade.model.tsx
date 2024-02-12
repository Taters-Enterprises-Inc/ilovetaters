export interface HrKraKpiGradeModel {
  kra_kpi_grade: Array<{
    id: number;
    weight: string;

    // CUSTOM FIELDS
    key_result_areas_or_key_performance_indiciators?: string;
    result_achieved_or_not_achieved?: string;
    rating?: string;
    score?: string;
  }>;
}
