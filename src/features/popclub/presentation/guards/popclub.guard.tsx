import { useAppSelector } from "features/config/hooks";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { Navigate, Outlet } from "react-router-dom";

export function PopClubGuard() {
  const getSessionState = useAppSelector(selectGetSession);

  if (
    getSessionState.status === GetSessionState.success &&
    getSessionState.data
  ) {
    if (getSessionState.data.cache_data === null) {
      return <Navigate to={"/"} />;
    }
  }

  return (
    <>
      <Outlet />
    </>
  );
}
