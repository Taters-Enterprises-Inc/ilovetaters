import { useAppSelector } from "features/config/hooks";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { Navigate, Outlet } from "react-router-dom";

export function CateringCheckoutGuard() {
  const getSessionState = useAppSelector(selectGetSession);

  if (
    getSessionState.status === GetSessionState.success &&
    getSessionState.data
  ) {
    const orders = getSessionState.data.orders
      ? getSessionState.data.orders
      : [];

    if (orders.length <= 0) {
      return <Navigate to={"/shop/products"} />;
    }
  }

  return (
    <>
      <Outlet />
    </>
  );
}
