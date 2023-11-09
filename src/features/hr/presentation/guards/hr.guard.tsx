import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  GetHrSessionState,
  getHrSession,
  selectGetHrSession,
} from "../slices/get-hr-session.slice";

export function HrGuard() {
  const dispatch = useAppDispatch();

  const getHrSessionState = useAppSelector(selectGetHrSession);

  useEffect(() => {
    dispatch(getHrSession());
  }, [dispatch]);

  console.log(getHrSessionState);

  if (
    getHrSessionState.data &&
    getHrSessionState.status === GetHrSessionState.success
  ) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  if (
    getHrSessionState.status == GetHrSessionState.fail &&
    getHrSessionState.data == null
  ) {
    return <Navigate to={"/hr"} />;
  }

  return null;
}
