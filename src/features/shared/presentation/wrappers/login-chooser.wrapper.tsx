import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LoginChooserModal } from "features/shared/presentation/modals";
import { Outlet } from "react-router-dom";
import {
  closeLoginChooserModal,
  selectLoginChooserModal,
} from "../slices/login-chooser-modal.slice";

export function LoginChooserWrapper() {
  const dispatch = useAppDispatch();
  const loginChooserModalState = useAppSelector(selectLoginChooserModal);

  return (
    <>
      <Outlet />

      <LoginChooserModal
        open={loginChooserModalState.status}
        required={loginChooserModalState.data.required}
        onClose={() => {
          dispatch(closeLoginChooserModal());
        }}
      />
    </>
  );
}
