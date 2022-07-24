import axios from "axios"
import { DealModel } from "features/popclub/core/domain/deal.model";
import { PlatformCategoryModel } from "features/popclub/core/domain/platform-category.model";
import { PlatformModel } from "features/popclub/core/domain/platform.model";
import { PopClubDataModel } from "features/popclub/core/domain/popclub-data.model";
import { GetAllPlatformCategoriesParam, GetDealsParam, SetPopclubDataParam } from "features/popclub/core/popclub.params";
import { REACT_APP_DOMAIN_URL } from '../../../shared/constants';

export interface GetAllPlatformRepositoryResponse{
    data: {
        message: string,
        data: Array<PlatformModel>
    }
}
export interface GetAllPlatformCategoriesRepositoryResponse{
    data: {
        message: string,
        data: Array<PlatformCategoryModel>
    }
}
export interface GetDealsRepositoryResponse{
    data: {
        message: string,
        data: Array<DealModel>
    }
}

export interface GetPopClubDataRepositortyResponse{
    data:{
        message: string,
        data: PopClubDataModel
    }
}

export interface SetPopClubDataResponse{
    data:{
        message: string,
    }
}


export function GetAllPlatformRepository() : Promise<GetAllPlatformRepositoryResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/platform`);
}

export function GetAllPlatformCategoriesRepository(param : GetAllPlatformCategoriesParam) : Promise<GetAllPlatformCategoriesRepositoryResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/category?platform_url_name=${param.platform_url_name}`);
}

export function GetDealsRepository(param : GetDealsParam) : Promise<GetDealsRepositoryResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/${param.platform_url_name}?category=${param.category_url_name}`);
}

export function GetPopClubDataRepository() : Promise<GetPopClubDataRepositortyResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/popclub_data`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}

export function SetPopClubDataRepository(param: SetPopclubDataParam) : Promise<SetPopClubDataResponse>{
    return axios.post(`${REACT_APP_DOMAIN_URL}api/popclub/popclub_data`, param, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}