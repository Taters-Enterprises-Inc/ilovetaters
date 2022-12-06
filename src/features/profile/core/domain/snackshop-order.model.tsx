export interface SnackShopOrderModel {
  id: number;
  dateadded: string;
  tracking_no: string;
  purchase_amount: string;
  distance_price: string;
  cod_fee: string;
  generated_raffle_code: string;
  application_status: boolean;
  hash_key: string;
}
