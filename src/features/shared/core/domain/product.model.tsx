export interface ProductModel {
  id: number;
  product_image: string;
  name: string;
  description: string;
  delivery_details: string;
  price: number;
  base_price?: number;
  uom: string;
  add_details: string;
  status: number;
  category: number;
  num_flavor: number;
  add_remarks: number;
  product_hash: string;
  note: string;
  tags: string;
  dateadded: string;
  product_code: string;
  report_status: number;
  to_gc_value: number;
  free_threshold?: number;

  promo_discount_percentage: string | null;
}
