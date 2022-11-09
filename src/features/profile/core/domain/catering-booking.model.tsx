export interface CateringBookingModel {
  seen: number;
  dateadded: string;
  tracking_no: string;

  purchase_amount: string;
  service_fee: number;
  night_diff_fee: number;
  additional_hour_charge: number;
  cod_fee: string;
  distance_price: string;

  status: number;
  hash_key: string;

  notification_id: string;
  dateseen: any;
}
