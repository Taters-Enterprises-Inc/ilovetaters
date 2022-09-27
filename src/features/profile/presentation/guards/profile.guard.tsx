import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";

export function ProfileGuard() {
  const dispatch = useAppDispatch();

  const getSessionState = useAppSelector(selectGetSession);

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  if (
    getSessionState.status === GetSessionState.fail ||
    getSessionState.data === null ||
    getSessionState.data?.userData === null
  ) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}
