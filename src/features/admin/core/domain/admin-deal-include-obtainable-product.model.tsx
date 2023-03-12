import { AdminPopclubProduct } from "./admin-popclub-product.model";

export interface AdminDealIncludeObtainableProductModel {
  product: AdminPopclubProduct | null;
  quantity: string;
  promo_discount_percentage: string;
}
