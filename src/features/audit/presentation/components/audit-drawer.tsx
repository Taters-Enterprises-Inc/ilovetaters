import { Box, Button, Divider, Drawer } from "@mui/material";
import { BSCDrawerTabs } from "features/bsc/presentation/components/bsc-drawer-tabs";
import { toggleBSCSideBar } from "features/bsc/presentation/slices/bsc-sidebar.slice";
import { FaBars } from "react-icons/fa";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { useState } from "react";
import { AuditDrawerMenu } from "./audit-drawer-menu";
import {
  selectAuditSideBar,
  toggleAuditSideBar,
} from "../slices/audit-sidebar-slice";
import { useAppSelector, useAppDispatch } from "features/config/hooks";

const drawerWidth = "17rem";

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

const Drawers = styled(MuiDrawer, {
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

const SideBarContent = () => {
  const auditSideBarState = useAppSelector(selectAuditSideBar);
  const dispatch = useAppDispatch();

  return (
    <Box className="relative h-screen bg-secondary font-['Varela_Round'] duration-500 z-10 overflow-y-auto overflow-x-hidden">
      <DrawerHeader className="!min-h-[0px] px-4 relative flex justify-end text-white top-5">
        <FaBars
          className={`cursor-pointer ${
            !auditSideBarState.status && "-translate-x-4"
          }`}
          onClick={() => {
            dispatch(toggleAuditSideBar());
          }}
        />
      </DrawerHeader>
      <div className="flex items-center px-4 gap-x-4">
        <img
          src={require("assets/favicon.png")}
          className={`duration-500 bg-white border-4 rounded-full cursor-pointer border-primary -mt-2
            ${!auditSideBarState.status && "translate-y-12"}`}
          alt="taters admin logo"
        />
        <h1
          className={`whitespace-pre duration-300 text-white origin-left font-medium -mt-2
          ${
            !auditSideBarState.status &&
            "opacity-0 translate-x-28 overflow-hidden"
          }`}
        >
          Internal Audit Portal
        </h1>
      </div>
      <div
        className={`whitespace-pre duration-300 mt-3 px-4 text-white 
                ${
                  !auditSideBarState.status &&
                  "opacity-0 translate-x-28 overflow-hidden "
                }`}
      >
        <div className="text-base">Administrator Need to change</div>

        <h2 className="text-xs">MIS Department</h2>
      </div>

      <AuditDrawerMenu />
    </Box>
  );
};

export function AuditDrawer() {
  const auditSideBarState = useAppSelector(selectAuditSideBar);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="md:hidden">
        <Drawer
          className="md:hidden"
          anchor={"left"}
          open={auditSideBarState.status}
          onClose={() => {
            dispatch(toggleAuditSideBar());
          }}
        >
          {SideBarContent()}
        </Drawer>
      </div>

      <div className="hidden md:block">
        {/* <div> */}
        <Drawers
          anchor="left"
          variant="permanent"
          sx={{ zIndex: 10 }}
          open={auditSideBarState.status}
          onClose={() => {
            dispatch(toggleAuditSideBar());
          }}
        >
          {SideBarContent()}
        </Drawers>
      </div>
    </>
  );
}
