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

    if (
      orders.length <= 0 &&
      getSessionState.data?.redeem_data?.deal_promo_price &&
      getSessionState.data.redeem_data.deal_promo_price <= 0
    ) {
      return <Navigate to={"/"} />;
    }
  }

  return (
    <>
      <Outlet />
    </>
  );
}
