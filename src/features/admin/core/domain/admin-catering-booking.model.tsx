export interface AdminCateringBookingModel {
  id: number;
  status: number;
  dateadded: string;
  serving_time: string;
  tracking_no: string;
  invoice_num: string;
  purchase_amount: string;
  start_datetime: string;
  end_datetime: string;
  message: string;
  event_class: string;
  company_name: string;

  service_fee: number;
  night_diff_fee: number;
  additional_hour_charge: number;
  cod_fee: string;

  payment_plan: string;

  uploaded_contract: string;

  initial_payment: number;
  initial_payment_proof: string;

  final_payment: number;
  final_payment_proof: string;

  client_name: string;
  email: string;
  contact_number: string;
  add_address: string;
  add_contact: string;

  account_name: string;
  account_email: string;

  fb_user_id: number | null;
  mobile_user_id: number | null;

  distance_price: string;
  reference_num: string;
  store: number;
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
