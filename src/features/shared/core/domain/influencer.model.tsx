export interface InfluencerModel {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  birthday: string;
  id_number: string;
  id_front: string;
  id_back: string;
  dateadded: string;
  status: number;
  payable: string | null;
  payment_selected: number;
  account_number: string;
  account_name: string;
}
