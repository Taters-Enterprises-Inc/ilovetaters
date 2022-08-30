export interface RedeemDealModel {
  deal_id: string;
  deal_hash: string;
  date_redeemed: string;
  expiration: string;
  redeem_code: string;

  name: string;
  product_image: string;
  description: string;
  original_price: string;
  promo_price: string;

  next_avialable_redeem?: string;
  redeem_cooldown?: string;
}
