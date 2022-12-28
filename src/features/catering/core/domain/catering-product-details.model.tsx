import { PackageFlavorModel } from "features/shared/core/domain/package-flavor.model";
import { ProductModel } from "features/shared/core/domain/product.model";

export interface CateringProductDetailsModel {
  product: ProductModel;
  addons: Array<ProductModel>;
  product_addons: Array<ProductModel>;
  product_flavor: Array<PackageFlavorModel>;
  product_prices: Array<{
    id: number;
    package_id: number;
    price: number;
    min_qty: number;
  }>;
  product_images: Array<string>;
}
