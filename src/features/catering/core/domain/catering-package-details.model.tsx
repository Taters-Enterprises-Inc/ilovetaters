import { ProductModel } from "features/shared/core/domain/product.model";

export interface CateringPackageDetailsModel {
  product: ProductModel;
  addons: Array<ProductModel>;
  product_addons: Array<ProductModel>;
  product_flavor: Array<{
    parent_name: string;
    flavors: Array<{
      id: number;
      name: string;
      product_variant_id: number;
      parent_name: string;
    }>;
  }>;
  product_prices: Array<{
    id: number;
    package_id: number;
    price: number;
    min_qty: number;
  }>;
  product_images: Array<string>;
}
