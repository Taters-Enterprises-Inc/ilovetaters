import { Outlet } from "react-router-dom";
import { FreeItemModal } from "../../../shared/presentation/modals";

export function CateringFreeItemModalWrapper() {
  return (
    <>
      <Outlet />

      <FreeItemModal />
    </>
  );
}
