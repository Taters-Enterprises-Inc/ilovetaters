import { Navigate, Outlet } from "react-router-dom";
import {
  getAdminSession,
  GetAdminSessionState,
  selectGetAdminSession,
} from "../slices/get-admin-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";

export function AdminGuard() {
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  useEffect(() => {
    dispatch(getAdminSession());
  }, [dispatch]);

  if (
    (getAdminSessionState.status === GetAdminSessionState.fail &&
      getAdminSessionState.data === null) ||
    getAdminSessionState.status === GetAdminSessionState.fail
  ) {
    return <Navigate to={"/admin"} />;
  }

  if (
    getAdminSessionState.data &&
    getAdminSessionState.status === GetAdminSessionState.success
  ) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return null;
}
