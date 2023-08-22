import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  GetProductDetailsState,
  selectGetProductDetails,
} from "../slices/get-product-details.slice";
import { insertShopProductViewLog } from "../slices/insert-shop-product-view-log.slice";

export function ShopProductViewLog() {
  const dispatch = useAppDispatch();

  const getProductDetailsState = useAppSelector(selectGetProductDetails);

  const { hash } = useParams();

  useEffect(() => {
    if (
      getProductDetailsState.status === GetProductDetailsState.success &&
      getProductDetailsState.data &&
      getProductDetailsState.data.product.product_hash === hash &&
      getProductDetailsState.data.product_size &&
      getProductDetailsState.data.product_size.length <= 0
    ) {
      dispatch(
        insertShopProductViewLog({
          product_id: getProductDetailsState.data.product.id,
        })
      );
    }
  }, [getProductDetailsState, dispatch, hash]);

  return <Outlet />;
}
