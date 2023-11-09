import { Navigate, Outlet } from "react-router-dom";
import {
  getBscSession,
  GetBscSessionState,
  selectGetBscSession,
} from "../slices/get-bsc-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import { BscNotVerifiedUser } from "../components";

export function BscGuard() {
  const dispatch = useAppDispatch();

  const getBscSessionState = useAppSelector(selectGetBscSession);

  useEffect(() => {
    dispatch(getBscSession());
  }, [dispatch]);

  if (
    getBscSessionState.data &&
    getBscSessionState.status === GetBscSessionState.success
  ) {
    if (getBscSessionState.data.bsc.user_status_id === 1) {
      return <BscNotVerifiedUser />;
    }

    return (
      <>
        <Outlet />
      </>
    );
  }

  if (
    getBscSessionState.status == GetBscSessionState.fail &&
    getBscSessionState.data == null
  ) {
    return <Navigate to={"/bsc"} />;
  }

  return null;
}
