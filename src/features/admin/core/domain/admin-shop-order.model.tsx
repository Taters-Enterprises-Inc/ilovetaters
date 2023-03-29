export interface AdminShopOrderModel {
  id: number;
  status: number;
  dateadded: string;
  tracking_no: string;
  purchase_amount: string;
  distance_price: string;
  discount: string | null;
  discount_name: string | null;
  discount_percentage: string | null;
  reseller_discount: string;
  giftcard_discount: string;
  cod_fee: string;
  invoice_num: string;
  hash_key: string;
  client_name: string;
  add_name: string;
  payops: number;
  email: string;
  contact_number: string;
  address: string;
  add_address: string;
  store_name: string;
  payment_proof: string;
  reference_num: string;
  store: number;
  fb_user_id: number | null;
  mobile_user_id: number | null;
  items: Array<{
    product_id: number;
    order_item_id: number;
    price: string;
    product_price: string;
    quantity: number;
    remarks: string;
    name: string;
    description: string;
    add_details: string;
    product_label: string | null;
    promo_discount_percentage: string | null;
    deal_discount_percentage: string | null;
    deal_products_promo_include: Array<{
      id: number;
      quantity: number | null;
      product_id: number;
      product_hash: string;
      product_variant_option_tb_id: number | null;
      promo_discount_percentage: string;
      obtainable: Array<{
        product_id: number;
        price: number;
        product_variant_option_tb_id: number;
        promo_discount_percentage: string;
      }>;
    }>;
  }>;
  deal_items: Array<{
    deal_id: string;
    deal_order_item_id: string;
    price: string | null;
    product_price: string | null;
    quantity: number;
    remarks: string;
    name: string;
    alias: string;
    description: string;
  }>;
}
