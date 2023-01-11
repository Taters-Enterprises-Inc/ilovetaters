import { AdminStoreProductModel } from "./admin-store-product.model";

export interface GetAdminStoreCateringProductsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  products: Array<AdminStoreProductModel>;
}
