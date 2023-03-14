import { Outlet } from "react-router-dom";
import { MessageModal } from "../modals";

export function MessageModalWrapper() {
  return (
    <>
      <Outlet />

      <MessageModal />
    </>
  );
}
