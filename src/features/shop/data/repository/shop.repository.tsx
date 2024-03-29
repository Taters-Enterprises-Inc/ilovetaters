import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { CartItemModel } from "features/shop/core/domain/cart-item.model";
import { CategoryProductModel } from "features/shared/core/domain/category-product.model";
import { EditCartItemModel } from "features/shop/core/domain/edit-cart-item.model";
import { OrderModel } from "features/shop/core/domain/order.model";
import { ProductDetailsModel } from "features/shop/core/domain/product-details.model";
import { ProductSkuModel } from "features/shop/core/domain/product-sku.model";
import { UserSessionModel } from "features/shop/core/domain/user-session.model";
import {
  CheckoutOrdersParam,
  GetCategoryProductsParam,
  GetOrdersParam,
  GetProductDetailsParam,
  GetProductSkuParam,
  AddToCartShopParam,
  GetSnackshopInfluencerPromoParam,
  InsertShopProductViewLogParam,
  InsertShopInitialCheckoutLogParam,
} from "features/shop/core/shop.params";
import { CheckoutOrdersModel } from "features/shop/core/domain/checkout-orders.model";
import { SnackshopDealModel } from "features/shop/core/domain/snackshop-deal.model";
import { GetSnackshopInfluencerPromoModel } from "features/shop/core/domain/get-snackshop-influencer-promo.model";

export interface GetCategoryProductsResponse {
  data: {
    message: string;
    data: Array<CategoryProductModel>;
  };
}

export interface GetProductDetailsResponse {
  data: {
    message: string;
    data: ProductDetailsModel;
  };
}

export interface CheckoutOrdersResponse {
  data: {
    data: CheckoutOrdersModel;
    message: string;
  };
}

export interface GetOrdersResponse {
  data: {
    message: string;
    data: OrderModel;
  };
}

export interface GetProductSkuResponse {
  data: {
    message: string;
    data: ProductSkuModel;
  };
}
export interface AddToCartShopResponse {
  data: {
    message: string;
  };
}

export interface RemoveItemFromCartShopResponse {
  data: {
    message: string;
  };
}

export interface GetUserSessionResponse {
  data: {
    message: string;
    data: UserSessionModel;
  };
}
export interface GetCartItemResponse {
  data: {
    message: string;
    data: CartItemModel;
  };
}
export interface GetEditCartItemResponse {
  data: {
    message: string;
    data: GetEditCartItemResponse;
  };
}

export interface GetSnackshopDealsResponse {
  data: {
    message: string;
    data: Array<SnackshopDealModel>;
  };
}

export interface GetSnackshopInfluencerPromoResponse {
  data: {
    message: string;
    data: GetSnackshopInfluencerPromoModel;
  };
}

export interface InsertShopProductViewLogResponse {
  data: {
    message: string;
  };
}

export interface InsertShopInitialCheckoutLogResponse {
  data: {
    message: string;
  };
}

export function InsertShopInitialCheckoutLogRepository(
  param: InsertShopInitialCheckoutLogParam
): Promise<InsertShopInitialCheckoutLogResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/shop/initial-checkout-log`,
    param,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function InsertShopProductViewLogRepository(
  param: InsertShopProductViewLogParam
): Promise<InsertShopProductViewLogResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/shop/product/view-log`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetSnackshopInfluencerPromoRepository(
  param: GetSnackshopInfluencerPromoParam
): Promise<GetSnackshopInfluencerPromoResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/shop/influencer-promo`, param, {
    withCredentials: true,
  });
}

export function GetSnackshopDealsRepository(): Promise<GetSnackshopDealsResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/shop/deals`, {
    withCredentials: true,
  });
}
export function RemoveItemFromCartShopRepository(
  param: number
): Promise<RemoveItemFromCartShopResponse> {
  return axios.delete(
    `${REACT_APP_DOMAIN_URL}api/cart/shop?item-index=${param}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function AddToCartShopRepository(
  param: AddToCartShopParam
): Promise<AddToCartShopResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/cart/shop`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetProductSkuRepository(
  param: GetProductSkuParam
): Promise<GetProductSkuResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/shop/get_product_sku`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetOrdersRepository(
  param: GetOrdersParam
): Promise<GetOrdersResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/shop/orders${
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

export function CheckoutOrdersRepository(
  param: CheckoutOrdersParam
): Promise<CheckoutOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/transaction/shop`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetProductDetailsRepository(
  param: GetProductDetailsParam
): Promise<GetProductDetailsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/shop/product${
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

export function GetCategoryProductsRepository(
  param: GetCategoryProductsParam
): Promise<GetCategoryProductsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/shop/products${
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

export function GetCartItemRepository(
  id: string | undefined
): Promise<GetCartItemResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/cart/shop?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetEditCartItemRepository(
  params: EditCartItemModel
): Promise<GetEditCartItemResponse> {
  return axios.put(`${REACT_APP_DOMAIN_URL}api/cart/shop`, params, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetUserSessionRepository(): Promise<GetUserSessionResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/profile/session`, {
    withCredentials: true,
  });
}
