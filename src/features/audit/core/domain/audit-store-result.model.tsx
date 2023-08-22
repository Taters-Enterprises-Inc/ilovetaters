export interface GetAuditStoreResultModel {
  [key: string]: Array<{
    id: number;
    category_name: number;
    grade: number;
    weight: number;
    final_score: number;
    target: number;
  }>;
}
