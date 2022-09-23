import { Fragment } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  selectAdminSideBar,
  toggleAdminSideBar,
} from "../slices/admin-sidebar.slice";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";

import {
  FaBars,
  FaRegListAlt,
  FaCartArrowDown,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
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

export function AdminDrawer() {
  const adminSideBarState = useAppSelector(selectAdminSideBar);
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  return (
    <Fragment>
      <Drawer
        anchor="left"
        variant="permanent"
        open={adminSideBarState.status}
        onClose={() => {
          dispatch(toggleAdminSideBar());
        }}
      >
        <Box className="relative h-screen bg-secondary font-['Roboto'] duration-500  overflow-y-auto overflow-x-hidden">
          <DrawerHeader className="!min-h-[0px] px-4 relative flex justify-end text-white top-5">
            <FaBars
              className={`cursor-pointer ${
                !adminSideBarState.status && "-translate-x-4"
              }`}
              onClick={() => dispatch(toggleAdminSideBar())}
            />
          </DrawerHeader>

          <div className="flex items-center px-4 gap-x-4">
            <img
              src={require("assets/favicon.png")}
              className={`duration-500 bg-white border-4 rounded-full cursor-pointer border-primary -mt-2
  ${!adminSideBarState.status && "translate-y-12"}`}
              alt="taters admin logo"
            />
            <h1
              className={`whitespace-pre duration-300 text-white origin-left font-medium -mt-2
          ${
            !adminSideBarState.status &&
            "opacity-0 translate-x-28 overflow-hidden"
          }`}
            >
              TEI Shop Admin
            </h1>
          </div>

          <div
            className={`whitespace-pre duration-300 mt-3 px-4 text-white 
                ${
                  !adminSideBarState.status &&
                  "opacity-0 translate-x-28 overflow-hidden "
                }`}
          >
            {getAdminSessionState.data ? (
              <div>
                <span className="text-base">
                  {getAdminSessionState.data.user_details.first_name}{" "}
                  {getAdminSessionState.data.user_details.last_name}
                </span>

                <span className="text-xs">
                  {getAdminSessionState.data.user_details.groups.map(
                    (group, i) => (
                      <>
                        {getAdminSessionState.data &&
                        i !==
                          getAdminSessionState.data.user_details.groups.length -
                            1
                          ? group.name + ", "
                          : group.name}
                      </>
                    )
                  )}
                </span>
              </div>
            ) : null}
          </div>

          <div className="relative flex flex-col pb-4 m-0 mt-2 text-sm text-white">
            <nav>
              <ul>
                <li>
                  <Link to="/admin/order" className="block w-full ">
                    <div className="flex items-center px-4 py-2">
                      <FaRegListAlt size={20} />
                      <span
                        className={`whitespace-pre duration-300 ${
                          !adminSideBarState.status &&
                          "opacity-0 overflow-hidden"
                        }`}
                      >
                        Orders
                      </span>
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </Box>
      </Drawer>
    </Fragment>
  );
}
