import { RedeemDealModel } from "./redeem_deal.model";

export interface SessionModel {
    cache_data ?: {
        store_id ?: string;
        region_id ?: number;
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
}