import { useAppSelector } from "features/config/hooks";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function ShopCheckoutGuard() {
  const getSessionState = useAppSelector(selectGetSession);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data
    ) {
      const orders = getSessionState.data.orders
        ? getSessionState.data.orders
        : [];
      const deals = getSessionState.data.deals
        ? getSessionState.data.deals
        : [];
      const total = orders.length + deals.length;

      if (total <= 0) {
        navigate(-1);
      }
    }
  }, [getSessionState, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}
