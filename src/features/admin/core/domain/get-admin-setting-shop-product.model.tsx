import { Variant } from "features/admin/presentation/pages/admin-setting-shop-edit-product.page";
import { AdminProductModel } from "./admin-product.model";
import { AdminStoreModel } from "./admin-store.model";

export interface GetAdminSettingShopProductModel {
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
  variants: Array<Variant>;
  stores: Array<AdminStoreModel>;
  products: Array<AdminProductModel>;
}
