export interface DealModel {
  id: number;
  product_image: string;
  name: string;
  description: string;
  delivery_details: string;

  promo_price: number | null;
  promo_discount_percentage: string | null;
  minimum_purchase: number | null;
  original_price: number | null;

  discounted_price: number;
  uom: string;
  add_details: string;
  status: number;
  category: number;
  num_flavor: number;
  add_remarks: number;
  hash: string;
  note: number;
  dateadded: string;
  product_code: string;
  report_status: number;

  available_start_time: string | null;
  available_end_time: string | null;

  available_start_datetime: string | null;
  available_end_datetime: string | null;

  available_days: string | null;
  seconds_before_expiration: string;

  deal_id: number;
  category_name: string;
  platform_id?: number;
}
