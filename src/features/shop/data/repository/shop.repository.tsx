import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import { GetCategoryProductsParam } from "features/shop/core/shop.params";

export interface GetCategoryProductsResponse{
    data: {
        message : string;
        data : Array<CategoryProductsModel>;
    }
}

export function GetCategoryProductsRepository(param : GetCategoryProductsParam) : Promise<GetCategoryProductsResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/shop/products${param.region_id ? '?region_id=' + param.region_id : ''}`,{
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}