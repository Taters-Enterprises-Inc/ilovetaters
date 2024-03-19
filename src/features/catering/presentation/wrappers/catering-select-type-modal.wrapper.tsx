import { Outlet } from "react-router-dom";
import { CateringSelectTypeModal } from "../modals";

export function CateringSelectTypeWrapper() {
  return (
    <>
      <Outlet />

      <CateringSelectTypeModal />
    </>
  );
}
