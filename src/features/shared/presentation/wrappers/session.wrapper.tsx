import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession } from "../slices/get-session.slice";
import { selectStoreReset } from "../slices/store-reset.slice";

export function SessionWrapper() {
  const dispatch = useAppDispatch();

  const storeResetState = useAppSelector(selectStoreReset);

  useEffect(() => {
    dispatch(getSession());
  }, [storeResetState]);

  return <Outlet />;
}
