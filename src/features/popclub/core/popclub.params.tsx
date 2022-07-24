export interface GetAllPlatformCategoriesParam {
    platform_url_name: string,
}

export interface GetDealsParam{
    platform_url_name: string,
    category_url_name: string,
}

export interface SetPopclubDataParam{
    platform?: string,
}