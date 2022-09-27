import { AdminStoreProductModel } from "./admin-store-product.model";

export interface GetAdminStoreProductsModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  products: Array<AdminStoreProductModel>;
}
