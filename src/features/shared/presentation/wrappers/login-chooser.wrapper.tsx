import { LoginChooserModal } from "features/shared/presentation/modals";
import { Outlet } from "react-router-dom";

export function LoginChooserWrapper() {
  return (
    <>
      <Outlet />
      <LoginChooserModal />
    </>
  );
}
