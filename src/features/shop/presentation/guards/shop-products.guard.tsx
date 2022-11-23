import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";

export function ShopProductsGuard() {
  const dispatch = useAppDispatch();

  const getSessionState = useAppSelector(selectGetSession);

  if (
    getSessionState.status === GetSessionState.success &&
    getSessionState.data &&
    (getSessionState.data.cache_data == null ||
      getSessionState.data.customer_address == null)
  ) {
    return <Navigate to={"/delivery"} />;
  }

  return <Outlet />;
}
