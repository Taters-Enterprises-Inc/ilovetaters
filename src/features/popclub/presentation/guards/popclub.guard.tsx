import { useAppSelector } from "features/config/hooks";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { Navigate, Outlet } from "react-router-dom";

export function PopClubGuard() {
  const getSessionState = useAppSelector(selectGetSession);

  return (
    <>
      <Outlet />
    </>
  );
}
