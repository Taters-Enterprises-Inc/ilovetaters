export interface GetAuditResponseModel {
  information: {
    id: number;
    attention: string;
    auditor: string;
    isacknowledged: boolean;
    audit_period: string;
    dateadded: string;
    type_id: string;
    type_name: string;
    store_name: string;
    signature_img: string;
    acknowledged_by: string;
  };

  default_weight_info: Array<{
    category_id: number;
    grade: number;
    weight: number;
    final_score: number;
  }>;

  answers: Array<{
    criteria: Array<{
      id: number;
      questions: string;
      rating: number;
      remarks: string;
      equivalent_point: number;
      section_id: number;
      urgency_rating: number;
      section_name: string;
      sub_section_name: string | null;
      category_id: number;
    }>;
    section: string | undefined;
  }>;
}
