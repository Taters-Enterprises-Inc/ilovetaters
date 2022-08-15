import axios from "axios"
import { SessionModel } from "features/shared/core/domain/session.model";
import { StoreModel } from "features/shared/core/domain/store.model";
import {  GetStoresAvailableParam, SetSessionParam, SetStoreAndAddressParm } from "features/shared/core/shared.params";
import { REACT_APP_DOMAIN_URL } from '../../constants';

export interface GetStoresAvailableResponse{
    data: {
        message: string;
        data: Array<StoreModel>;
    }
}

export interface SetStoreAndAddressResponse{
    data: {
        message: string;
    }
}

export interface GetSessionResponse{
    data: {
        data: SessionModel;
        message: string;
    }
}

export interface SetSessionResponse{
    data: {
        message: string;
    }
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
    return axios.get(`${REACT_APP_DOMAIN_URL}api/shared/session`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}

export function SetSessionRepository(param: SetSessionParam): Promise<GetSessionResponse>{
    return axios.post(`${REACT_APP_DOMAIN_URL}api/shared/session`, {'session' : param},{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}
