import { useEffect, useState } from "react";
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
import { PageTitle } from "./page-title";

export function AdminHead() {
  const dispatch = useAppDispatch();
  const logoutAdminState = useAppSelector(selectLogoutAdmin);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (logoutAdminState.status === LogoutAdminState.success) {
      dispatch(getAdminSession());
      dispatch(resetLogoutAdmin());
    }
  }, [logoutAdminState, dispatch]);

  return (
    <div className="flex justify-between">
      <div className="mt-1.5 xl:mt-2 xl:-ml-16 sm:-ml-4 ">
        <PageTitle
          home={{
            title: "Home",
            url: "#",
          }}
        />
      </div>

      <div className="relative flex justify-end mt-2.5 mr-4 text-secondary ">
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
