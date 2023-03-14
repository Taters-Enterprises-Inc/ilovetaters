import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "features/config/hooks";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";

export function CateringProductsGuard() {
  const getSessionState = useAppSelector(selectGetSession);

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
