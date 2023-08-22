export interface AdminInfluencerCashoutModel {
  id: number;
  id_number: number;
  id_front: string;
  id_back: string;
  cashout: string;
  fb_user_id: number;
  mobile_user_id: number;
  influencer_cashout_status_id: number;
  dateadded: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  fb_user_name: string | null;
  mobile_user_name: string | null;
  payment_selected: number;
  account_number: string;
  account_name: string;
}
