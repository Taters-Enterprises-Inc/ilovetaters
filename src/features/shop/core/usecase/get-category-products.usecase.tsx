import { GetCategoryProductsRepository, GetCategoryProductsResponse } from "features/shop/data/repository/shop.repository";
import { GetCategoryProductsParam } from "../shop.params";


export default function GetCategoryProductsUsecase(param : GetCategoryProductsParam) : Promise<GetCategoryProductsResponse> {
    return GetCategoryProductsRepository(param);
}