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
  original_price: string;
  promo_price: string;

  minimum_purchase?: number;
}
