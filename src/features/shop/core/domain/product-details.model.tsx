import { ProductModel } from "features/shared/core/domain/product.model";

export interface ProductDetailsModel {
  product: ProductModel;
  addons?: Array<ProductModel>;
  product_size?: Array<{
    id: number;
    name: string;
  }>;
  product_flavor?: Array<{
    id: number;
    name: string;
  }>;
  suggested_products?: Array<ProductModel>;
  product_images: Array<string>;
}
