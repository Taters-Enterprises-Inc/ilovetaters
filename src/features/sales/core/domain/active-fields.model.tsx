export interface SalesActiveFieldsModel {
  form_data: [
    {
      section: string;
      fields: [
        {
          id: string;
          field_name: string;
          description: string;
          section: number;
          status: string;
          is_dropdown: boolean;
          section_name: string;
        }
      ];
    }
  ];
}
