import { ProductModel } from "features/shared/core/domain/product.model";

export interface CateringProductDetailsModel {
  product: ProductModel;
  addons: Array<ProductModel>;
  product_addons: Array<ProductModel>;
  product_flavor: Array<{
    id: number;
    name: string;
    product_variant_id: number;
    parent_name: string;
  }>;
  product_prices: Array<{
    id: number;
    package_id: number;
    price: number;
    min_qty: number;
  }>;
}
