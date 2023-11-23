export interface LoginHrParam {
  identity: string;
  password: string;
}

export interface SubmitAssessmentParam {
  staff_id?: string;
  staff_action_item_id?: string;

  kra_kpi_grade: Array<{
    id: number;
    weight: string;

    // CUSTOM FIELDS
    key_result_areas_or_key_performance_indiciators?: string;
    result_achieved_or_not_achieved?: string;
    rating?: string;
    score?: string;
  }>;
  core_competency_grade: Array<{
    id: number;
    title: string;
    description: string;

    // CUSTOM FIELDS
    critical_incidents_or_comments?: string;
    rating?: string;
  }>;
  functional_competency_and_punctuality_grade: Array<{
    id: number;
    title: string;
    description: string;

    // CUSTOM FIELDS
    critical_incidents_or_comments?: string;
    rating?: string;
  }>;
  attendance_and_punctuality: {
    absences?: string;
    tardiness?: string;
  };
  comments?: {
    key_strengths: string;
    areas_for_development: string;
    major_development_plans_for_next_year: string;
    comments_on_your_overall_performance_and_development_plan: string;
  };
}

export interface SubmitKraParam {
  action_item_id: number;
  kra_1: string;
  kra_2: string;
  kra_3: string;
}

export interface UpdateKraParam {
  kras: Array<{
    details: string;
    id: number;
  }>;
}

export interface UpdateActionItemParam {
  item_id: number;
  action_item_id: number;
  status: number;
}
