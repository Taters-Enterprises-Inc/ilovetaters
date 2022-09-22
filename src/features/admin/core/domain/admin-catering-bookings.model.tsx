export interface AdminCateringBookingsModel {
  id: number;
  status: number;
  dateadded: string;
  serving_time: string;
  tracking_no: string;
  invoice_num: string;
  purchase_amount: string;
  service_fee: number;
  night_diff_fee: number;
  additional_hour_charge: number;
  cod_fee: string;
  distance_price: string;
  reference_num: string;
  store: number;
  client_name: string;
  payops: number;
  store_name: string;
  items: Array<{
    product_price: string;
    quantity: number;
    remarks: string;
    name: string;
    description: string;
    add_details: string;
    product_label: string;
  }>;
}
