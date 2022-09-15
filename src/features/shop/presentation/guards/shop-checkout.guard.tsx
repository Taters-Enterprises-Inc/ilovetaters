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
    const deals = getSessionState.data.deals ? getSessionState.data.deals : [];
    const total = orders.length + deals.length;

    if (total <= 0) {
      return <Navigate to={"/"} />;
    }
  }

  return (
    <>
      <Outlet />
    </>
  );
}
