import { useEffect } from "react";
import { TbLogout } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  logoutAdmin,
  LogoutAdminState,
  resetLogoutAdmin,
  selectLogoutAdmin,
} from "../slices/logout-admin.slice";
import { getAdminSession } from "../slices/get-admin-session.slice";
import { AdminBreadCrumbs, AdminBreadCrumbsProps } from "./admin-breadcrumbs";

interface AdminHeadProps {
  AdminBreadCrumbsProps: AdminBreadCrumbsProps;
}

export function AdminHead(props: AdminHeadProps) {
  const dispatch = useAppDispatch();
  const logoutAdminState = useAppSelector(selectLogoutAdmin);

  useEffect(() => {
    if (logoutAdminState.status === LogoutAdminState.success) {
      dispatch(getAdminSession());
      dispatch(resetLogoutAdmin());
    }
  }, [logoutAdminState, dispatch]);

  return (
    <div className="flex justify-between p-4">
      <AdminBreadCrumbs {...props.AdminBreadCrumbsProps} />

      <div className="relative flex items-center justify-end text-secondary ">
        <MdOutlineNotificationsNone
          className="mr-4 cursor-pointer "
          size={20}
        />
        <TbLogout
          onClick={() => {
            dispatch(logoutAdmin());
          }}
          className="cursor-pointer"
          size={20}
        />
      </div>
    </div>
  );
}
