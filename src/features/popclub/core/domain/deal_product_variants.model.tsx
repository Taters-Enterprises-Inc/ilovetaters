import { ProductModel } from "./product.model";
import { ProductVariantModel } from "./product_variant.model";

export interface DealProductVariantsModel {
    option_id: number;
    product_variants: Array<ProductVariantModel>;
    product: ProductModel
}