import { MdOutlineNotificationsNone } from "react-icons/md";
import { AdminBreadCrumbs, AdminBreadCrumbsProps } from "./admin-breadcrumbs";
import Popper from "@mui/material/Popper";
import * as React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

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
  return (
    <div className="flex justify-between p-4">
      <AdminBreadCrumbs {...props.AdminBreadCrumbsProps} />
      <div className="relative flex items-center justify-end text-secondary ">
        <button aria-describedby={id} type="button" onClick={handleClick}>
          <Badge badgeContent={0} color="primary">
            <MdOutlineNotificationsNone className="cursor-pointer " size={20} />
          </Badge>
        </button>

        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className="z-40 mr-4 shadow-2xl lg:hidden bg-paper">
            <Box
              sx={{
                bgcolor: "background.paper",
                height: 600,
                width: 300,
              }}
            >
              <div className="bg-secondary font-['Bebas_Neue'] text-white text-center text-xl w-100% p-2">
                Notifications
              </div>
            </Box>
          </div>
          <div className="z-40 hidden mr-6 shadow-2xl lg:block bg-paper">
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
      </div>
    </div>
  );
}
