import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect, useRef } from "react";
import {
  GetAdminSessionState,
  getAdminSession,
  selectGetAdminSession,
} from "features/admin/presentation/slices/get-admin-session.slice";

export function AuditGuard() {
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const location = useLocation();

  useEffect(() => {
    dispatch(getAdminSession());
  }, [dispatch]);

  if (
    getAdminSessionState.data &&
    getAdminSessionState.status === GetAdminSessionState.success &&
    (getAdminSessionState.data.admin.is_audit_admin === true ||
      getAdminSessionState.data.admin.is_admin === true)
  ) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  if (
    getAdminSessionState.status === GetAdminSessionState.fail &&
    getAdminSessionState.data === undefined
  ) {
    return (
      <Navigate to={"/internal"} state={{ pathname: location.pathname }} />
    );
  }
  return null;
}
