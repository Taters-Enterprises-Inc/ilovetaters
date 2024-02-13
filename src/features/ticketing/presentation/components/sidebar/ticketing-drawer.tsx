import { Box, Button, Divider, Drawer, IconButton } from "@mui/material";
import { BSCDrawerTabs } from "features/bsc/presentation/components/bsc-drawer-tabs";
import { FaBars } from "react-icons/fa";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { useState } from "react";

import { useAppSelector, useAppDispatch } from "features/config/hooks";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import {
  selectTicketingSideBar,
  toggleTicketingSideBar,
} from "../../slices/ticketing-sidebar.slice";
import { TicketingDrawerMenu } from "./ticketing-drawer-menu";

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
  const ticketingSidebar = useAppSelector(selectTicketingSideBar);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box className="relative h-screen bg-secondary font-['Varela_Round'] duration-500 z-10 overflow-y-auto overflow-x-hidden">
      <DrawerHeader className="!min-h-[0px] px-4 relative flex justify-end text-white top-5 space-x-3">
        <FaBars
          className={`cursor-pointer ${
            !ticketingSidebar.status && "-translate-x-4"
          }`}
          onClick={() => {
            dispatch(toggleTicketingSideBar());
          }}
        />
      </DrawerHeader>

      <div className="flex items-center px-4 space-x-2">
        <img
          src={require("assets/favicon.png")}
          className={`duration-500 bg-white border-4 rounded-full cursor-pointer border-primary -mt-2
            ${!ticketingSidebar.status && "translate-y-14"}`}
          alt="taters admin logo"
        />
        <h1
          className={`whitespace-pre duration-300 text-white origin-left font-medium -mt-2 pr-8
          ${
            !ticketingSidebar.status &&
            "opacity-0 translate-x-28 overflow-hidden"
          }`}
        >
          Ticketing System
        </h1>
      </div>

      <div className="mt-2">
        <IconButton
          onClick={() => {
            navigate("/admin/landing");
          }}
          sx={{ width: "100%" }}
        >
          <div className="flex text-white text-sm space-x-2 mt-2 w-full">
            <BsArrowReturnLeft
              className={`${
                !ticketingSidebar.status &&
                "translate-y-16 translate-x-4 text-xl"
              }`}
            />
            <span className={`${!ticketingSidebar.status && "hidden"}`}>
              Return to menu page
            </span>
          </div>
        </IconButton>
      </div>

      <div
        className={`whitespace-pre duration-300 px-4 text-white 
                ${
                  !ticketingSidebar.status &&
                  "opacity-0 translate-x-28 overflow-hidden "
                }`}
      >
        <div>
          <div className="text-lg capitalize">
            {getAdminSessionState.data?.admin.user_details.first_name +
              " " +
              getAdminSessionState.data?.admin.user_details.last_name}
          </div>

          <div className="flex flex-col text-xs">
            {getAdminSessionState.data?.admin.user_details.company}
          </div>

          {/* <div className="flex flex-col text-xs">
            {getAdminSessionState.data?.admin.user_details.sos_groups.map(
              (row, index) => (
                <span key={index}>{row.description}</span>
              )
            )}
          </div> */}
        </div>
      </div>

      <TicketingDrawerMenu />
    </Box>
  );
};

export function TicketingDrawer() {
  const ticketingSidebar = useAppSelector(selectTicketingSideBar);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="md:hidden">
        <Drawer
          className="md:hidden"
          anchor={"left"}
          open={ticketingSidebar.status}
          onClose={() => {
            dispatch(toggleTicketingSideBar());
          }}
        >
          {SideBarContent()}
        </Drawer>
      </div>

      <div className="hidden md:block">
        <Drawers
          anchor="left"
          variant="permanent"
          sx={{ zIndex: 10 }}
          open={ticketingSidebar.status}
          onClose={() => {
            dispatch(toggleTicketingSideBar());
          }}
        >
          {SideBarContent()}
        </Drawers>
      </div>
    </>
  );
}