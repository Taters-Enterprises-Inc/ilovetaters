export interface AdminSessionModel {
  admin: {
    identity: string;
    email: string;
    user_id: string;
    old_last_login: string;
    last_check: string;

    is_admin: boolean;
    is_audit_admin: boolean;
    is_catering_admin: boolean;
    is_csr_admin: boolean;

    is_snackshop_available: boolean;
    is_catering_available: boolean;
    is_popclub_store_visit_available: boolean;
    is_popclub_snacks_delivered_available: boolean;
    session_id: string;

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
      sos_groups: Array<{
        id: number;
        short_name: string;
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
