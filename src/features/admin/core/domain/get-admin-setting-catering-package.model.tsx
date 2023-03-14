import { Variant } from "features/admin/presentation/pages/admin-setting-shop-edit-product.page";
import { AdminCateringDynamicPrice } from "./admin-catering-dynamic-price.model";
import { SnackshopStoreModel } from "./snackshop-store.model";

export interface GetAdminSettingCateringPackageModel {
  id: string;
  name: string;
  product_image: string;
  description: string;
  delivery_details: string;
  price: number;
  uom: string;
  add_details: string;
  status: number;
  category: number;
  num_flavor: number;
  dateadded: string;
  free_threshold: number;
  dynamic_prices: Array<AdminCateringDynamicPrice>;
  variants: Array<Variant>;
  stores: Array<SnackshopStoreModel>;
}
