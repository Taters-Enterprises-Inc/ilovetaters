export interface PackageFlavorModel {
  parent_name: string;
  flavors: Array<{
    id: number;
    name: string;
    product_variant_id: number;
    parent_name: string;
  }>;
}
