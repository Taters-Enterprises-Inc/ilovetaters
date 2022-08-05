import axios from "axios"
import { DealModel } from "features/popclub/core/domain/deal.model";
import { PlatformCategoryModel } from "features/popclub/core/domain/platform-category.model";
import { PlatformModel } from "features/popclub/core/domain/platform.model";
import { PopClubDataModel } from "features/popclub/core/domain/popclub-data.model";
import { SessionModel } from "features/popclub/core/domain/session.model";
import { StoreModel } from "features/popclub/core/domain/store.model";
import { GetAllPlatformCategoriesParam, GetDealsParam, GetStoresAvailableParam, SetPopclubDataParam, SetSessionParam, SetStoreAndAddressParm } from "features/popclub/core/popclub.params";
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

export interface GetStoresAvailableResponse{
    data: {
        message: string,
        data: Array<StoreModel>,
    }
}

export interface SetStoreAndAddressResponse{
    data: {
        message: string,
    }
}

export interface GetSessionResponse{
    data: {
        data: SessionModel,
        message: string,
    }
}

export interface SetSessionResponse{
    data: {
        message: string,
    }
}

export interface GetDealResponse{
    data: {
        data: DealModel,
        message: string,
    }
}

export function GetAllPlatformRepository() : Promise<GetAllPlatformRepositoryResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/platform`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}

export function GetAllPlatformCategoriesRepository(param : GetAllPlatformCategoriesParam) : Promise<GetAllPlatformCategoriesRepositoryResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/category?platform_url_name=${param.platform_url_name}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}

export function GetDealsRepository(param : GetDealsParam) : Promise<GetDealsRepositoryResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/${param.platform_url_name}?category=${param.category_url_name}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}

export function GetDealRepository(hash : string) : Promise<GetDealResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/deal/${hash}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
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
  
export function GetStoresAvailableRepository(param: GetStoresAvailableParam) : Promise<GetStoresAvailableResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/store${param.address ? '?address=' + param.address : ''}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}

export function SetStoreAndAddressRepository(param: SetStoreAndAddressParm) : Promise<GetStoresAvailableResponse>{
    return axios.post(`${REACT_APP_DOMAIN_URL}api/store`,param,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}

export function GetSessionRepository(): Promise<GetSessionResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/session`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}

export function SetSessionRepository(param: SetSessionParam): Promise<GetSessionResponse>{
    return axios.post(`${REACT_APP_DOMAIN_URL}api/popclub/session`, {'session' : param},{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}
