import axios from "axios";
import { BranchesStoreModel } from "features/branches/core/domain/branches-store.model";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface GetBranchesStoreResponse {
    data: {
        message: string;
        data: Array<{
            ncr: Array<BranchesStoreModel>;
            luzon: Array<BranchesStoreModel>;
            visayas: Array<BranchesStoreModel>;
            mindanao: Array<BranchesStoreModel>;
        }>;
    }
}


export function GetBranchesStoreRepository() : Promise<GetBranchesStoreResponse> {
    return axios.get(`${REACT_APP_DOMAIN_URL}api/branches`,{
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}