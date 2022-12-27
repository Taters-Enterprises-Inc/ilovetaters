export interface AdminSettingCatersPackageModel {
  id: number;
  product_image: string;
  name: string;
  description: string;
  delivery_details: string;
  price: number;
  uom: string;
  add_details: string;
  status: number;
  category: string;
  num_flavor: number;
  add_remarks: number;
  product_hash: string;
  note: string;
  tags: string;
  dateadded: string;
  product_code: string;
  report_status: number;
  to_gc_value: number;
  free_threshold: number;
  package_type: number;
}

export interface DynamicPriceCatersPackageModel {
  id: number;
  package_id: number;
  price: number;
  min_qty: number;
}

export interface VariantCatersPackageModel {
  id: string;
  product_id: string;
  name: string;
  status: string;
}

export interface VariantOptionPriceCatersPackageModel {
  id: string;
  product_variant_id: string;
  name: string;
  status: string;
}
