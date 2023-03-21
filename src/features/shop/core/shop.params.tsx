export interface AddToCartShopParam {
  prod_id: number;
  prod_image_name: string;
  prod_name: string;
  prod_qty: number;
  prod_price: number;
  prod_calc_amount: number;
  prod_flavor?: string;
  prod_flavor_id?: number;
  prod_with_drinks?: number;
  prod_size?: string;
  prod_size_id?: number;
  flavors_details?: string;
  prod_sku_id?: number;
  prod_sku?: number;
  prod_discount?: number;
  prod_category: number;
  prod_type: "main" | "addon";
  promo_discount_percentage: string | null;
}

export interface GetProductSkuParam {
  prod_size: string;
  prod_flavor: string;
}

export interface GetOrdersParam {
  hash: string;
}

export interface GetCategoryProductsParam {
  region_id: number;
}

export interface GetProductDetailsParam {
  hash: string;
}

export interface CheckoutOrdersParam {
  firstName: string;
  lastName: string;
  eMail: string;
  payops: string;
  phoneNumber: string;
  landmarkAddress: string;
  completeDeliveryAddress: string;
}

export interface GetSnackshopInfluencerProductParam {
  referralCode: string;
  productId: number;
}
