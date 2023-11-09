export interface HrPerformanceCriteriaModel {
  performance_criteria: Array<{
    name: string;
    minimum_score: string;
    maximum_score: string;
  }>;
}
