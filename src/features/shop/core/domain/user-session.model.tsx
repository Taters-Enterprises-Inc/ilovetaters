export interface UserSessionModel {
  userData: {
    oauth_provider: string;
    oauth_uid: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    picture: string;
    link: string;
    login_type: "mobile" | "facebook";
    mobile_user_id: number;
    mobile_number: string;
  };
}
