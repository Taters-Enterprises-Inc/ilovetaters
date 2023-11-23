export interface SalesActiveFieldsModel {
  list_of_stores: Array<{
    name: string;
  }>;
  discount_type: Array<{
    id: string;
    name: string;
  }>;

  field_data: Array<{
    section: string;
    field: Array<{
      sub_section: string;
      field_data: Array<{
        id: string;
        field_name: string;
        description: string;
        section: string;
        status: boolean;
        is_dropdown: boolean;
        width: number;
        payment_sub_section: string;
        section_name: string;
        sub_section_name: string;
        name: string;
        is_required: boolean;
        is_date_field: boolean;
      }>;
    }>;
  }>;
}
