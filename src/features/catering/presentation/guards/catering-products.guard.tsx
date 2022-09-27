import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";

export function CateringProductsGuard() {
  const dispatch = useAppDispatch();

  const getSessionState = useAppSelector(selectGetSession);

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  if (
    getSessionState.status === GetSessionState.success &&
    getSessionState.data &&
    (getSessionState.data.cache_data == null ||
      getSessionState.data.customer_address == null)
  ) {
    return <Navigate to={"/shop"} />;
  }

  return <Outlet />;
}
