import { AdminDealIncludedProductModel } from "./admin-deal-include-product.model";
import { AdminDealProductModel } from "./admin-deal-product.model";
import { AdminPopclubCategory } from "./admin-popclub-category.model";
import { AdminProductModel } from "./admin-product.model";
import { PopclubStoreModel } from "./popclub-store.model";

export interface GetAdminSettingPopclubDealModel {
  alias: string;
  name: string;
  hash: string;
  original_price: string;
  promo_price: string;
  product_image: string;
  promo_discount_percentage: string;
  minimum_purchase: string;
  is_free_delivery: boolean;
  description: string;
  seconds_before_expiration: string;
  available_start_time: string;
  available_end_time: string;
  available_start_datetime: string;
  available_end_datetime: string;
  available_days: string;
  categories: Array<AdminPopclubCategory>;
  excluded_products: Array<AdminProductModel>;
  included_products: Array<AdminDealIncludedProductModel>;
  products: Array<AdminDealProductModel>;
  stores: Array<PopclubStoreModel>;
}
