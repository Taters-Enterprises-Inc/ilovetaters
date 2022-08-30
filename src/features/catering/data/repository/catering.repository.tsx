import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import {
  GetCategoryProductsParam,
  GetCateringProductDetailsParam,
} from "features/catering/core/catering.params";
import { CateringProductDetailsModel } from "features/catering/core/domain/catering-product-details.model";

export interface GetCategoryProductsResponse {
  data: {
    message: string;
    data: Array<CategoryProductsModel>;
  };
}

export interface GetCateringProductDetailsResponse {
  data: {
    message: string;
    data: CateringProductDetailsModel;
  };
}

export function GetCateringProductDetailsRepository(
  param: GetCateringProductDetailsParam
): Promise<GetCateringProductDetailsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/catering/product${
      param.hash ? "?hash=" + param.hash : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function GetCateringCategoryProductsRepository(
  param: GetCategoryProductsParam
): Promise<GetCategoryProductsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/catering/products${
      param.region_id ? "?region_id=" + param.region_id : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}
