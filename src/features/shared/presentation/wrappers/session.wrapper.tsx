import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "features/config/hooks";
import { getSession } from "../slices/get-session.slice";

export function SessionWrapper() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
  }, []);

  return <Outlet />;
}
