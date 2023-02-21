import { ProductVariantOptionsModel } from "./product_variant_options.model";

export interface ProductVariantModel {
  id: number;
  product_id: number;
  name: string;
  status: number;
  options: Array<{
    id: number;
    product_variant_id: number;
    name: string;
    status: number;
  }>;
}
