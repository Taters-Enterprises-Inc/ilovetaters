import { AdminDealIncludeObtainableProductModel } from "./admin-deal-include-obtainable-product.model";
import { AdminPopclubProduct } from "./admin-popclub-product.model";

export interface AdminDealIncludedProductModel {
  product: AdminPopclubProduct | null;
  quantity: string;
  promo_discount_percentage: string;
  obtainable: Array<AdminDealIncludeObtainableProductModel>;
}
