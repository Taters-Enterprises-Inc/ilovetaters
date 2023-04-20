import { Box } from "@mui/material";
import { BSCDrawerTabs } from "features/bsc/presentation/components/bsc-drawer-tabs";
import { toggleBSCSideBar } from "features/bsc/presentation/slices/bsc-sidebar.slice";
import { FaBars } from "react-icons/fa";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { useState } from "react";
import { AuditDrawerMenu } from "./audit-drawer-menu";

const drawerWidth = "16rem";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `5rem`,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export function AuditDrawer() {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      className="hidden lg:block"
      sx={{ zIndex: 10 }}
      open={open}
      onClose={open ? handleDrawerClose : handleDrawerOpen}
    >
      <Box className="relative h-screen bg-secondary font-['Varela_Round'] duration-500 z-10 overflow-y-auto overflow-x-hidden">
        <DrawerHeader className="!min-h-[0px] px-4 relative flex justify-end text-white top-5">
          <FaBars
            className={`cursor-pointer ${!open && "-translate-x-4"}`}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
          />
        </DrawerHeader>
        <div className="flex items-center px-4 gap-x-4">
          <img
            src={require("assets/favicon.png")}
            className={`duration-500 bg-white border-4 rounded-full cursor-pointer border-primary -mt-2
            ${!open && "translate-y-12"}`}
            alt="taters admin logo"
          />
          <h1
            className={`whitespace-pre duration-300 text-white origin-left font-medium -mt-2
          ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
          >
            Taters Portal
          </h1>
        </div>
        <div
          className={`whitespace-pre duration-300 mt-3 px-4 text-white 
                ${!open && "opacity-0 translate-x-28 overflow-hidden "}`}
        >
          <div className="text-base">Administrator Need to change</div>

          <h2 className="text-xs">MIS Department</h2>
        </div>

        {/* <BSCDrawerTabs /> */}
        <AuditDrawerMenu isOpen={open} />
      </Box>
    </Drawer>
  );
}
