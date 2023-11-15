export interface HrAppraisalResponseModel {
  appraisal_response?: {
    id: number;
    module: string;
    item: string;
    status: string;
    status_id: number;
    item_id: number;
  };
}
