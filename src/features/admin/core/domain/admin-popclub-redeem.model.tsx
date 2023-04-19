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
  mobile_user_id: number;
  fb_user_id: number;
  partner_company_id_number: string | null;

  items: Array<{
    price: string | null;
    quantity: number;
    remarks: string;
    alias: string;
    description: string;
    is_partner_company: boolean;
  }>;
}
