export interface AdminPopclubRedeemModel {
  id: number;
  status: number;
  dateadded: string;
  expiration: string;
  redeem_code: string;
  purchase_amount: string;
  invoice_num: string;
  client_name: string;
  payops: 2;
  email: string;
  contact_number: string;
  address: string;
  add_address: string;
  store_name: string;

  items: Array<{
    price: number;
    quantity: number;
    remarks: string;
    alias: string;
  }>;
}
