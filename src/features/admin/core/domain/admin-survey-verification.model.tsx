export interface AdminSurveyVerificationModel {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  birthday: string;
  id_number: string;
  id_front: string;
  id_back: string;
  dateadded: string;
  discount_type_id: number;
  discount_type_name: string;
  status: number;

  fb_first_name: string;
  fb_last_name: string;

  mobile_first_name: string;
  mobile_last_name: string;
}
