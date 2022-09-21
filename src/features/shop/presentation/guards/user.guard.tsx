import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  getUserSession,
  GetUserSessionState,
  selectGetUserSession,
} from "../slices/get-user-session.slice";

export function UserGuard() {
  const dispatch = useAppDispatch();

  const getUserSessionState = useAppSelector(selectGetUserSession);

  useEffect(() => {
    dispatch(getUserSession());
  }, [dispatch]);

  if (
    getUserSessionState.data &&
    getUserSessionState.status === GetUserSessionState.success
  ) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  if (
    getUserSessionState.status === GetUserSessionState.fail &&
    getUserSessionState.data === null
  ) {
    return <Navigate to={"/shop"} />;
  }

  return null;
}
