export interface SessionModel {
    cache_data ?: {
        store_id ?: string,
        region_id ?: number,
        store_name ?: string,
    }

    customer_address ?: string,
    userData: {
        oauth_provider: string,
        oauth_uid: string,
        first_name: string,
        last_name: string,
        email: string,
        gender: string,
        picture: string,
        link: string
    },
    
    popclub_data : {
        platform: string,
    }
}