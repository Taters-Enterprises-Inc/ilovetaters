import { ProductModel } from "features/shared/core/domain/product.model";
import { ProductFlavorsModel } from "./product_flavors.model";

export interface ProductDetailsModel {
  product: ProductModel;
  addons?: Array<ProductModel>;
  product_size?: Array<{
    id: number;
    name: string;
  }>;
  product_flavor: Array<ProductFlavorsModel>;
  suggested_products?: Array<ProductModel>;
  product_images: Array<string>;
}
