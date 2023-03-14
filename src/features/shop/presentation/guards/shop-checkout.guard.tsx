import { useAppSelector } from "features/config/hooks";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { Navigate, Outlet } from "react-router-dom";

export function ShopCheckoutGuard() {
  const getSessionState = useAppSelector(selectGetSession);

  if (
    getSessionState.status === GetSessionState.success &&
    getSessionState.data
  ) {
    const orders = getSessionState.data.orders
      ? getSessionState.data.orders
      : [];

    const redeemData = getSessionState.data.redeem_data;

    if (redeemData) {
      if (redeemData.deal_promo_price && redeemData.deal_promo_price <= 0) {
        return <Navigate to={"/delivery/products"} />;
      } else if (redeemData.deal_promo_price === null) {
        if (orders.length <= 0) {
          return <Navigate to={"/delivery/products"} />;
        }
      }
    } else if (orders.length <= 0) {
      return <Navigate to={"/delivery/products"} />;
    }
  }

  return (
    <>
      <Outlet />
    </>
  );
}
