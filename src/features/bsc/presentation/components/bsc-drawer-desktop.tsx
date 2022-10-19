import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import React from "react";
import {
  selectBSCSideBar,
  toggleBSCSideBar,
} from "../slices/bsc-sidebar.slice";
import { FaBars } from "react-icons/fa";
import { AdminDrawerTabs } from "features/admin/presentation/components";
import { BSCDrawerTabs } from "./bsc-drawer-tabs";

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

export default function BSCDrawerDesktop() {
  const BSCSideBarState = useAppSelector(selectBSCSideBar);
  const dispatch = useAppDispatch();
  //   const getAdminSessionState = useAppSelector(selectGetAdminSession);
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      className="hidden lg:block"
      sx={{ zIndex: 10 }}
      open={BSCSideBarState.status}
      onClose={() => {
        dispatch(toggleBSCSideBar());
      }}
    >
      <Box className="relative h-screen bg-secondary font-['Varela_Round'] duration-500 z-10 overflow-y-auto overflow-x-hidden">
        <DrawerHeader className="!min-h-[0px] px-4 relative flex justify-end text-white top-5">
          <FaBars
            className={`cursor-pointer ${
              !BSCSideBarState.status && "-translate-x-4"
            }`}
            onClick={() => dispatch(toggleBSCSideBar())}
          />
        </DrawerHeader>

        <div className="flex items-center px-4 gap-x-4">
          <img
            src={require("assets/favicon.png")}
            className={`duration-500 bg-white border-4 rounded-full cursor-pointer border-primary -mt-2
  ${!BSCSideBarState.status && "translate-y-12"}`}
            alt="taters admin logo"
          />
          <h1
            className={`whitespace-pre duration-300 text-white origin-left font-medium -mt-2
          ${
            !BSCSideBarState.status &&
            "opacity-0 translate-x-28 overflow-hidden"
          }`}
          >
            Balance Score Card
          </h1>
        </div>

        <BSCDrawerTabs />
      </Box>
    </Drawer>
  );
}
