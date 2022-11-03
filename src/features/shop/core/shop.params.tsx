export interface AddToCartShopParam {
  prod_id: number;
  prod_image_name: string;
  prod_name: string;
  prod_qty: number;
  prod_price: number;
  prod_calc_amount: number;
  prod_flavor?: number;
  prod_flavor_id?: number;
  prod_with_drinks?: number;
  prod_size?: number;
  prod_size_id?: number;
  flavors_details?: string;
  prod_sku_id?: number;
  prod_sku?: number;
  prod_discount?: number;
  prod_category: number;
  prod_type: "main" | "addon";
}

export interface GetProductSkuParam {
  prod_size: number | undefined;
  prod_flavor: number | undefined;
}

export interface GetOrdersParam {
  hash: string;
}

export interface CheckoutOrdersParam {
  firstName: string;
  lastName: string;
  eMail: string;
  phoneNumber: string;
  payops: string;
  address: string;
  full_address: string;
}

export interface GetCategoryProductsParam {
  region_id: number;
}

export interface GetProductDetailsParam {
  hash: string;
}
