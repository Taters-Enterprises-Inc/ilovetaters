
import { ProductModel } from "features/shared/core/domain/product.model";
import { ProductVariantModel } from "./product_variant.model";

export interface DealProductVariantsModel {
    option_id: number;
    quantity: number;
    product_variants: Array<ProductVariantModel>;
    product: ProductModel
}