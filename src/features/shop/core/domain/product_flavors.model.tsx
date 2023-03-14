import { ProductFlavorModel } from "./product_flavor.model";

export interface ProductFlavorsModel {
  parent_name: string;
  flavors: Array<ProductFlavorModel>;
}
