export interface RedeemDealModel {
  deal_id: string;
  deal_hash: string;
  store: string;
  date_redeemed: string;
  remarks: string;
  expiration: string;
  redeem_code: string;

  name: string;
  product_image: string;
  description: string;

  redeem_hash: string;

  original_price: number | null;
  promo_price: number | null;
  promo_discount_percentage: string | null;
  minimum_purchase: number | null;
  is_free_delivery: number;
  deal_products_promo_exclude: Array<{
    product_id: number;
  }>;
}
