export interface BscSessionModel {
  bsc: {
    identity: string;
    email: string;
    user_id: string;
    old_last_login: string;
    last_check: string;
    is_admin: boolean;
    user_status_id: number;
  };
}
