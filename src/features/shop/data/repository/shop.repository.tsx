import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { ProductModel } from "features/shared/core/domain/product.model";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { OrderModel } from "features/shop/core/domain/order.model";
import { ProductSkuModel } from "features/shop/core/domain/product-sku.model";
import { SnackShopOrderModel } from "features/shop/core/domain/snackshop-order.model";
import { AddToCartParam, CheckoutOrdersParam, GetCategoryProductsParam, GetOrdersParam, GetProductDetailsParam, GetProductSkuParam } from "features/shop/core/shop.params";

export interface GetCategoryProductsResponse{
    data: {
        message : string;
        data : Array<CategoryProductsModel>;
    }
}

export interface GetProductDetailsResponse{
    data: {
        message: string;
        data : {
            product: ProductModel;
            addons: Array<ProductModel>;
            product_size: Array<{
                id: number;
                name: string;
            }>;
            product_flavor: Array<{
                id: number;
                name: string;
            }>;
        }
    }
}

export interface AddToCartResponse {
    data: {
        message: string;
    }
}

export interface CheckoutOrdersResponse{
    data: {
        message: string;
    }
}

export interface GetOrdersResponse{
    data: {
        message: string;
        data: OrderModel;
    }
}

export interface GetSnackShopOrderHistoryResponse{
    data: {
        message: string;
        data: Array<SnackShopOrderModel>
    }
}

export interface GetCateringBookingHistoryResponse{
    data: {
        message: string;
        data: Array<SnackShopOrderModel>
    }
}

export interface GetProductSkuResponse{
    data: {
        message: string;
        data: ProductSkuModel
    }
}

export function GetProductSkuRepository(param: GetProductSkuParam) : Promise<GetProductSkuResponse>{
    return axios.post(`${REACT_APP_DOMAIN_URL}api/shop/get_product_sku`,param,{
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}

export function GetCateringBookingHistoryRepository() : Promise<GetCateringBookingHistoryResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/profile/catering-bookings`,{
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}


export function GetSnackShopOrderHistoryRepository() : Promise<GetSnackShopOrderHistoryResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/profile/snackshop-orders`,{
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}

export function GetOrdersRepository(param : GetOrdersParam) : Promise<GetOrdersResponse> {
    return axios.get(`${REACT_APP_DOMAIN_URL}api/shop/orders${param.hash ?"?hash=" + param.hash : ""}`,{
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}

export function CheckoutOrdersRepository(param : CheckoutOrdersParam) : Promise<CheckoutOrdersResponse> {
    return axios.post(`${REACT_APP_DOMAIN_URL}api/transaction/shop`, param,{
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}

export function AddToCartRepository(param : AddToCartParam) : Promise<AddToCartResponse> {
    return axios.post(`${REACT_APP_DOMAIN_URL}api/cart`, param,{
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}

export function GetProductDetailsRepository(param : GetProductDetailsParam) : Promise<GetProductDetailsResponse> {
    return axios.get(`${REACT_APP_DOMAIN_URL}api/shop/product${param.hash ? '?hash=' + param.hash : ''}`,{
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
} 

export function GetCategoryProductsRepository(param : GetCategoryProductsParam) : Promise<GetCategoryProductsResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/shop/products${param.region_id ? '?region_id=' + param.region_id : ''}`,{
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}