export interface GetAuditResponseModel {
  information: {
    id: number;
    attention: string;
    audit_period: string;
    dateadded: string;
    type_id: string;
    type_name: string;
    store_name: string;
  };

  default_weight_info: Array<{
    category_id: string;
    weight: number;
  }>;

  answers: Array<{
    criteria: Array<{
      id: number;
      questions: string;
      rating: number;
      remarks: string;
      equivalent_point: number;
      section_id: number;
      level: number;
      section_name: string;
      sub_section_name: string | null;
      category_id: number;
    }>;
    section: string | undefined;
  }>;
}
