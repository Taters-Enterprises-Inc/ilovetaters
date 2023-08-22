export interface GetRedeemParam {
  deal_id: number;
}

export interface RedeemDealParam {
  hash: string;
  remarks: string;
}

export interface GetDealProductVariantsParam {
  hash: string;
}

export interface GetAllPlatformCategoriesParam {
  platform_url_name: string;
}

export interface GetDealsParam {
  platform_url_name: string;
  category_url_name: string;
}

export interface SetPopclubDataParam {
  platform?: "store-visit" | "online-delivery";
}

export interface GetStoresAvailableParam {
  address: string | null;
}

export interface SetStoreAndAddressParm {
  address: string | null;
  storeId: number;
}

export interface SetSessionParam {
  customer_address?: string | null;
  cache_data?: any;
}
