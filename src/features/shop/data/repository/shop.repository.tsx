import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { ProductModel } from "features/shared/core/domain/product.model";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { AddToCartParam, GetCategoryProductsParam, GetProductDetailsParam } from "features/shop/core/shop.params";

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