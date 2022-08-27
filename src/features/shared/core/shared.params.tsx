export interface DeleteContactParam{
    id: number;
}
export interface UpdateContactParam{
    id: number;

    body:{
        contact: string;
    }
}
export interface AddContactParam{
    contact: string;
}

export interface UploadProofOfPaymentParam{
    formData: FormData;
}

export interface GetStoresAvailableParam{
    address: string | null;
}

export interface SetStoreAndAddressParm{
    address: string | null;
    storeId: number;
}

export interface SetSessionParam {
    customer_address ?: string | null;
    cache_data?: any;
}

export interface FacebookLoginPointParam {
    currentUrl: string;
}