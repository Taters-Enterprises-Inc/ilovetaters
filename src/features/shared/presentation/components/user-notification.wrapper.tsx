import { Outlet } from "react-router-dom";
import { UnExpiredRedeem } from "./unexpired-redeem";

export function UserNotificationWrapper() {
  return (
    <>
      <Outlet />
      <UnExpiredRedeem />
    </>
  );
}
