export interface AdminShopOrderModel {
  id: number;
  status: number;
  dateadded: string;
  tracking_no: string;
  purchase_amount: string;
  distance_price: string;
  invoice_num: string;
  client_name: string;
  payops: 2;
  email: string;
  contact_number: string;
  address: string;
  add_address: string;
  store_name: string;
  items: Array<{
    price: string;
    quantity: number;
    remarks: string;
    name: string;
    description: string;
  }>;
}
