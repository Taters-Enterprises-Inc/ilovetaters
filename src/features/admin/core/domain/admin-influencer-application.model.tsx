export interface AdminInfluencerApplicationModel {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  birthday: string;
  id_number: string;
  id_front: string;
  id_back: string;
  dateadded: string;
  payment_selected: number;
  account_number: string;
  account_name: string;
  status: number;
  contract: string | null;

  fb_first_name: string;
  fb_last_name: string;

  mobile_first_name: string;
  mobile_last_name: string;
}
