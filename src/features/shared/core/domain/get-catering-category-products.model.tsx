import { CategoryProductModel } from "./category-product.model";
import { ProductModel } from "./product.model";

export interface GetCateringCategoryProductsModel {
  products: Array<CategoryProductModel>;
  addons: Array<ProductModel>;
  product_addons: Array<ProductModel>;
}
