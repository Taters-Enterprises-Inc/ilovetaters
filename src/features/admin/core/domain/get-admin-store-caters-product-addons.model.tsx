import { AdminStoreCatersProductAddonModel } from "./admin-store-caters-product-addon.model";

export interface GetAdminStoreCatersProductAddonsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  caters_product_addons: Array<AdminStoreCatersProductAddonModel>;
}
