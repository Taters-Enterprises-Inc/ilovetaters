export interface AdminSessionModel {
  admin: {
    identity: string;
    email: string;
    user_id: string;
    old_last_login: string;
    last_check: string;

    is_admin: boolean;
    is_catering_admin: boolean;
    is_csr_admin: boolean;

    user_details: {
      id: number;
      first_name: string;
      last_name: string;
      phone: string;
      company: string;
      groups: Array<{
        id: number;
        name: string;
        description: string;
      }>;
      stores: Array<{
        store_id: number;
        name: string;
        menu_name: string;
      }>;
    };
  };
}
