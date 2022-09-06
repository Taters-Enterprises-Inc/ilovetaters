import { ProductModel } from "features/shared/core/domain/product.model";

export interface CartItemModel {
  product: ProductModel;
  order_item: {
    product_id: number;
    combination_id: number;
    type: string;
    quantity: number;
    status: number;
    remarks: string;
    promo_id: number;
    promo_price: string;
    sku: null;
    sku_id: null;
    calc_price: string;
    product_price: string;
    product_image: string;
    name: string;
    description: string;
    delivery_details: string;
    uom: string;
    add_details: string;
    add_remarks: number;
    product_hash: string;
    note: null;
    product_code: string;
    product_label: string;
    addon_drink: string;
    addon_flav: string;
    addon_butter: string;
    addon_base_product: null;
    freebie_prod_name: null;
  };
  product_images: Array<string>;
  product_addson: Array<{
    add_details: string
add_remarks: number
addon_product_id: number
category: number
dateadded: string
delivery_details: string
description: string
id: number
name: string
note: string
num_flavor:number
price: number
product_code:string
product_hash: string
product_id: number
product_image:string
report_status: number
status: number
tags: string
to_gc_value: number
uom: string
  }>;
  suggested_products: Array<{
    description: string
    hash:string
    id: number;
    image:string
    name: string
    price: number;
    uom:string
  }>;
  product_size:Array<{id:number , name:string}>
  product_flavor:Array<{id:number , name:string}>
}
