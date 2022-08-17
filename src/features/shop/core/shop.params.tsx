export interface GetCategoryProductsParam{
    region_id: number;
}

export interface GetProductDetailsParam{
    hash: string;
}

export interface AddToCartParam{
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
    prod_multiflavors?: string;
    prod_sku_id?: number;
    prod_sku?: number;
    prod_discount?: number;
    prod_category: number;
}