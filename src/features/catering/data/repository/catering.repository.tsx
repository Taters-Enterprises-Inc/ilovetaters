import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  AddToCartCateringParam,
  CateringCheckoutOrdersParam,
  GetCategoryPackagesParam,
  GetCateringOrdersParam,
  GetCateringPackageDetailsParam,
  UploadContractParam,
  CateringUploadProofOfPaymentParam,
  AddToCartProductsParam,
  GetCateringCategoryProductsParam,
} from "features/catering/core/catering.params";
import { CateringPackageDetailsModel } from "features/catering/core/domain/catering-package-details.model";
import { CateringOrderModel } from "features/catering/core/domain/catering-order.model";
import { CheckoutOrdersModel } from "features/shop/core/domain/checkout-orders.model";
import { CategoryProductModel } from "features/shared/core/domain/category-product.model";
import { GetCateringCategoryProductsModel } from "features/shared/core/domain/get-catering-category-products.model";

export interface GetCategoryPackagesResponse {
  data: {
    message: string;
    data: Array<CategoryProductModel>;
  };
}

export interface GetCateringPackageDetailsResponse {
  data: {
    message: string;
    data: CateringPackageDetailsModel;
  };
}

export interface AddToCartCateringResponse {
  data: {
    message: string;
  };
}

export interface RemoveItemFromCartCateringResponse {
  data: {
    message: string;
  };
}

export interface CateringCheckoutOrdersResponse {
  data: {
    message: string;
    data: CheckoutOrdersModel;
  };
}
export interface GetCateringOrdersResponse {
  data: {
    message: string;
    data: CateringOrderModel;
  };
}

export interface UploadContractResponse {
  data: {
    message: string;
  };
}

export interface CateringUploadProofOfPaymentResponse {
  data: {
    message: string;
  };
}

export interface AddToCartCateringProductsResponse {
  data: {
    message: string;
  };
}

export interface GetCateringCategoryProductsResponse {
  data: {
    message: string;
    data: GetCateringCategoryProductsModel;
  };
}
export function GetCateringCategoryProductsRepository(
  param: GetCateringCategoryProductsParam
): Promise<GetCateringCategoryProductsResponse> {
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

export function AddToCartCateringProductsRepository(
  param: AddToCartProductsParam
): Promise<CateringUploadProofOfPaymentResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/cart/catering-product/`,
    param,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function CateringUploadProofOfPaymentRepository(
  param: CateringUploadProofOfPaymentParam
): Promise<CateringUploadProofOfPaymentResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/shared/catering_upload_payment/`,
    param.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}
export function UploadContractRepository(
  param: UploadContractParam
): Promise<UploadContractResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/catering/upload_contract/`,
    param.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function GetCateringOrdersRepository(
  param: GetCateringOrdersParam
): Promise<GetCateringOrdersResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/catering/orders${
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

export function CateringCheckoutOrdersRepository(
  param: CateringCheckoutOrdersParam
): Promise<CateringCheckoutOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/transaction/catering`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function RemoveItemFromCartCateringRepository(
  param: number
): Promise<RemoveItemFromCartCateringResponse> {
  return axios.delete(
    `${REACT_APP_DOMAIN_URL}api/cart/catering?item-index=${param}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function AddToCartCateringRepository(
  param: AddToCartCateringParam
): Promise<AddToCartCateringResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/cart/catering`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetCateringPackageDetailsRepository(
  param: GetCateringPackageDetailsParam
): Promise<GetCateringPackageDetailsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/catering/package${
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

export function GetCateringCategoryPackagesRepository(
  param: GetCategoryPackagesParam
): Promise<GetCategoryPackagesResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/catering/packages${
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
