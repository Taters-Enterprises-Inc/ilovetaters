
export interface GetStoresAvailableParam{
    address: string | null,
}

export interface SetStoreAndAddressParm{
    address: string | null,
    storeId: number,
}

export interface SetSessionParam {
    customer_address ?: string | null;
    cache_data?: any;
}