export interface GetAuditResponseInformationQualityAuditInformationModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  responses: Array<{
    id: number;
    attention: string;
    audit_period: string;
    dateadded: string;
    hash: string;
    type_name: string;
    store_name: string;
  }>;
}
