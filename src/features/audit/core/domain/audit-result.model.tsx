export interface AuditResultModel {
  [key: number]: {
    category: number;
    grade: number;
    weight: number;
    final: number;
  };
}
