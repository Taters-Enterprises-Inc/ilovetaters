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
import { useNavigate } from "react-router-dom";
import Popper from "@mui/material/Popper";
import * as React from "react";
import Box from "@mui/material/Box";

interface AdminHeadProps {
  AdminBreadCrumbsProps: AdminBreadCrumbsProps;
}

export function AdminHead(props: AdminHeadProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const dispatch = useAppDispatch();
  const logoutAdminState = useAppSelector(selectLogoutAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutAdminState.status === LogoutAdminState.success) {
      dispatch(getAdminSession());
      dispatch(resetLogoutAdmin());
      navigate("/admin");
    }
  }, [logoutAdminState, dispatch]);

  return (
    <div className="flex justify-between p-4">
      <AdminBreadCrumbs {...props.AdminBreadCrumbsProps} />

      <div className="relative flex items-center justify-end text-secondary ">
        {/* <MdOutlineNotificationsNone
          className="mr-4 cursor-pointer "
          size={20}
        /> */}

        <button aria-describedby={id} type="button" onClick={handleClick}>
          <MdOutlineNotificationsNone
            className="mr-2 cursor-pointer "
            size={20}
          />
        </button>

        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className="z-40 mr-2 shadow-2xl lg:mr-10 bg-paper">
            <Box
              sx={{
                bgcolor: "background.paper",
                height: 600,
                width: 400,
              }}
            >
              <div className="bg-secondary font-['Bebas_Neue'] text-white text-center text-xl w-100% p-2">
                Notifications
              </div>
            </Box>
          </div>
        </Popper>

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
