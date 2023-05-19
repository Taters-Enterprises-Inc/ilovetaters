export interface GetAuditResponseModel {
  information: {
    id: number;
    attention: string;
    audit_period: string;
    dateadded: string;
    type_name: string;
    store_name: string;
  };

  answers: Array<{
    id: number;
    questions: string;
    rating: number;
    remarks: string;
    equivalent_point: number;
    level: number;
    section_name: string;
    sub_section_name: string | null;
    category_id: number;
  }>;
}
