import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  GetAdminSessionState,
  getAdminSession,
  selectGetAdminSession,
} from "features/admin/presentation/slices/get-admin-session.slice";

export function AuditGuard() {
  const dispatch = useAppDispatch();

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  useEffect(() => {
    dispatch(getAdminSession());
  }, [dispatch]);

  if (
    getAdminSessionState.data &&
    getAdminSessionState.status === GetAdminSessionState.success &&
    getAdminSessionState.data.admin.is_audit_admin === true
  ) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  if (
    getAdminSessionState.status === GetAdminSessionState.fail &&
    getAdminSessionState.data === null
  ) {
    return <Navigate to={"/internal/audit"} />;
  }

  return null;
}
