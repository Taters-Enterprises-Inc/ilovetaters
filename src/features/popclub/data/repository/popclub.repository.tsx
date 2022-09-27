import axios from "axios";
import { DealModel } from "features/popclub/core/domain/deal.model";
import { PlatformCategoryModel } from "features/popclub/core/domain/platform-category.model";
import { PlatformModel } from "features/popclub/core/domain/platform.model";
import { PopClubDataModel } from "features/popclub/core/domain/popclub-data.model";
import { ProductVariantModel } from "features/popclub/core/domain/product_variant.model";
import { StoreModel } from "features/shared/core/domain/store.model";
import {
  GetAllPlatformCategoriesParam,
  GetDealProductVariantsParam,
  GetDealsParam,
  GetRedeemParam,
  GetStoresAvailableParam,
  RedeemDealParam,
  SetPopclubDataParam,
  SetStoreAndAddressParm,
} from "features/popclub/core/popclub.params";
import { REACT_APP_DOMAIN_URL } from "../../../shared/constants";
import { RedeemDealModel } from "features/shared/core/domain/redeem_deal.model";
import { RedeemValidatorsModel } from "features/popclub/core/domain/redeem_validators.model";

export interface GetAllPlatformRepositoryResponse {
  data: {
    message: string;
    data: Array<PlatformModel>;
  };
}
export interface GetAllPlatformCategoriesRepositoryResponse {
  data: {
    message: string;
    data: Array<PlatformCategoryModel>;
  };
}
export interface GetDealsRepositoryResponse {
  data: {
    message: string;
    data: Array<DealModel>;
  };
}

export interface GetPopClubDataRepositoryResponse {
  data: {
    message: string;
    data: PopClubDataModel;
  };
}

export interface SetPopClubDataResponse {
  data: {
    message: string;
  };
}

export interface GetStoresAvailableResponse {
  data: {
    message: string;
    data: Array<StoreModel>;
  };
}

export interface SetStoreAndAddressResponse {
  data: {
    message: string;
  };
}

export interface GetDealResponse {
  data: {
    data: DealModel;
    message: string;
  };
}

export interface GetDealProductVariantsResponse {
  data: {
    data: Array<ProductVariantModel>;
    message: string;
  };
}

export interface RedeemDealResponse {
  data: {
    message: string;
    data: RedeemDealModel;
  };
}

export interface GetRedeemsResponse {
  data: {
    data: RedeemDealModel;
    message: string;
  };
}

export interface GetRedeemResponse {
  data: {
    data: RedeemDealModel;
    message: string;
  };
}

export interface GetLatestUnexpiredRedeemResponse {
  data: {
    data: RedeemDealModel;
    next_avialable_redeem?: string;
    message: string;
  };
}

export interface ForfeitRedeemResponse {
  data: {
    message: string;
  };
}

export interface RedeemValidatorsResponse {
  data: {
    message: string;
    data: RedeemValidatorsModel;
  };
}
export function RedeemValidatorsRepository(): Promise<RedeemValidatorsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/redeem-validators`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function ForfeitRedeemRepository(): Promise<ForfeitRedeemResponse> {
  return axios.delete(`${REACT_APP_DOMAIN_URL}api/popclub/redeem`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetLatestUnexpiredRedeemRepository(): Promise<GetLatestUnexpiredRedeemResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/redeem`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetRedeemRepository(
  param: GetRedeemParam
): Promise<GetRedeemResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/popclub/redeem?deal_id=${param.deal_id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function GetRedeemsRepository(): Promise<GetRedeemsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/redeems`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function RedeemDealRepository(
  param: RedeemDealParam
): Promise<RedeemDealResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/popclub/redeem_deal`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetDealProductVariantsRepository(
  param: GetDealProductVariantsParam
): Promise<GetDealProductVariantsResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/popclub/check_product_variant_deals`,
    param,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}
export function GetAllPlatformRepository(): Promise<GetAllPlatformRepositoryResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/platform`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetAllPlatformCategoriesRepository(
  param: GetAllPlatformCategoriesParam
): Promise<GetAllPlatformCategoriesRepositoryResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/popclub/category?platform_url_name=${param.platform_url_name}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function GetDealsRepository(
  param: GetDealsParam
): Promise<GetDealsRepositoryResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/popclub/${param.platform_url_name}?category=${param.category_url_name}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function GetDealRepository(hash: string): Promise<GetDealResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/deal/${hash}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetPopClubDataRepository(): Promise<GetPopClubDataRepositoryResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/popclub/popclub_data`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function SetPopClubDataRepository(
  param: SetPopclubDataParam
): Promise<SetPopClubDataResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/popclub/popclub_data`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetStoresAvailableRepository(
  param: GetStoresAvailableParam
): Promise<GetStoresAvailableResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/store${
      param.address ? "?address=" + param.address : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function SetStoreAndAddressRepository(
  param: SetStoreAndAddressParm
): Promise<GetStoresAvailableResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/store`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}
