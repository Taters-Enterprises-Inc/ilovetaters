export interface HrAppraisalSummaryModel {
  name: string;
  description?: string;
  is_overall?: boolean;
  columns: Array<number | string>;
}
