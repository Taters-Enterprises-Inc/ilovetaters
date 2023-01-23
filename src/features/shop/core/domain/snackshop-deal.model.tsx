export interface SnackshopDealModel {
  hash: string;
  name: string;
  description: string;
  product_image: string;
  promo_discount_percentage: string;
  minimum_purchase: number;
  is_free_delivery: 0 | 1;
  available_start_time: string | null;
  available_end_time: string | null;
  available_start_datetime: string | null;
  available_end_datetime: string | null;
  available_days: string | null;
  seconds_before_expiration: number;
}
