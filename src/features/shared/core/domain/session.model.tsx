import { RedeemDealModel } from "./redeem_deal.model";

export interface SessionModel {
    cache_data ?: {
        store_id ?: string;
        region_id ?: number;
        region_name ?: string;
        store_name ?: string;
    };

    customer_address ?: string;
    
    userData: {
        oauth_provider: string;
        oauth_uid: string;
        first_name: string;
        last_name: string;
        email: string;
        gender: string;
        picture: string;
        link: string
    };
    
    popclub_data : {
        platform: string;
    };

    redeem_data : Array<RedeemDealModel>;

    orders : Array<{
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
        prod_multiflavors?: string;
        prod_sku_id?: number;
        prod_sku?: number;
        prod_discount?: number;
        prod_category: number;
    }>;

    deals : any;

    
    km_radius: string,
    km_min: string,
    free_delivery: number,
    free_min_delivery: number,
    delivery_rate: string,
    minimum_rate: string,
    catering_delivery_rate: string,
    catering_minimum_rate: string,
    distance: number,
    distance_rate_id: number
    distance_rate_price: number,
    distance_rate_price_before: number,
    distance_routes: string,
    distance_radius: string,

    payops_list: Array<{
        id: number;
        type: number;
        name: string;
        acct: string;
        acct_name: string;
        qr_code: string;
    }>

    cash_delivery: string;
}