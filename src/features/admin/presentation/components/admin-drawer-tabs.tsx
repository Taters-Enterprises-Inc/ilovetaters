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
  closeAdminSideBar,
  selectAdminSideBar,
  toggleAdminSideBar,
} from "../slices/admin-sidebar.slice";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import {
  FaBars,
  FaRegListAlt,
  FaCartArrowDown,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import {
  MdFoodBank,
  MdOutlineSettings,
  MdProductionQuantityLimits,
} from "react-icons/md";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoIosArrowForward } from "react-icons/io";

const drawerWidth = "16rem";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: "#22201A",
  color: "white",
  padding: 0,
  margin: 0,
  minHeight: 0,
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
    {...props}
  />
))(({ theme }) => ({
  background: "#22201A",
  color: "white",
  padding: 0,
  margin: 0,
  minHeight: 0,
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  margin: 0,
  minHeight: 0,
}));

export interface AdminDrawerTabsProps {
  mobile?: boolean;
}

export function AdminDrawerTabs(props: AdminDrawerTabsProps) {
  const adminSideBarState = useAppSelector(selectAdminSideBar);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const dispatch = useAppDispatch();

  return (
    <div className="relative flex flex-col pb-4 m-0 mt-2 text-sm text-white">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/order"
              onClick={() => {
                if (props.mobile) dispatch(closeAdminSideBar());
              }}
              className={(navData) =>
                navData.isActive ? "flex bg-white text-secondary" : "flex"
              }
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <FaRegListAlt size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !adminSideBarState.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    Orders
                  </span>
                </span>
              </span>
            </NavLink>
          </li>

          {getAdminSessionState.data?.is_admin ||
          getAdminSessionState.data?.is_catering_admin ||
          getAdminSessionState.data?.is_csr ? (
            <li>
              <NavLink
                to="/admin/catering"
                onClick={() => {
                  if (props.mobile) dispatch(closeAdminSideBar());
                }}
                className={(navData) =>
                  navData.isActive ? "flex bg-white text-secondary" : "flex"
                }
              >
                <span className="flex items-center px-4 ">
                  <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                    <MdFoodBank size={20} />

                    <span
                      className={`whitespace-pre duration-300 ${
                        !adminSideBarState.status && "opacity-0 overflow-hidden"
                      }`}
                    >
                      Catering
                    </span>
                  </span>
                </span>
              </NavLink>
            </li>
          ) : null}

          <li>
            <NavLink
              to="/admin/popclub"
              onClick={() => {
                if (props.mobile) dispatch(closeAdminSideBar());
              }}
              className={(navData) =>
                navData.isActive ? "flex bg-white text-secondary" : "flex"
              }
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <FaCartArrowDown size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !adminSideBarState.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    PopClub
                  </span>
                </span>
              </span>
            </NavLink>
          </li>
          <li>
            <div className="flex px-4">
              <div className="flex-1">
                <Accordion disableGutters>
                  <AccordionSummary>
                    <span className="flex items-center">
                      <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                        <MdProductionQuantityLimits size={20} />
                        <span
                          className={`whitespace-pre duration-300 ${
                            !adminSideBarState.status &&
                            "opacity-0 overflow-hidden"
                          }`}
                        >
                          Availabilities
                        </span>
                      </span>
                    </span>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      <li>
                        <NavLink
                          to="/admin/availability/deal"
                          onClick={() => {
                            if (props.mobile) dispatch(closeAdminSideBar());
                          }}
                          className={(navData) =>
                            navData.isActive
                              ? "flex bg-white text-secondary"
                              : "flex"
                          }
                        >
                          <span className="flex items-center ">
                            <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                              <IoIosArrowForward size={20} />

                              <span
                                className={`whitespace-pre duration-300 ${
                                  !adminSideBarState.status &&
                                  "opacity-0 overflow-hidden"
                                }`}
                              >
                                Deals Availability
                              </span>
                            </span>
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/admin/availability/product"
                          onClick={() => {
                            if (props.mobile) dispatch(closeAdminSideBar());
                          }}
                          className={(navData) =>
                            navData.isActive
                              ? "flex bg-white text-secondary"
                              : "flex"
                          }
                        >
                          <span className="flex items-center ">
                            <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                              <IoIosArrowForward size={20} />

                              <span
                                className={`whitespace-pre duration-300 ${
                                  !adminSideBarState.status &&
                                  "opacity-0 overflow-hidden"
                                }`}
                              >
                                Products Availability
                              </span>
                            </span>
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </li>
          {getAdminSessionState.data?.is_admin ||
          getAdminSessionState.data?.is_csr ? (
            <li>
              <div className="flex px-4">
                <div className="flex-1">
                  <Accordion disableGutters>
                    <AccordionSummary>
                      <span className="flex items-center">
                        <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                          <MdOutlineSettings size={20} />

                          <span
                            className={`whitespace-pre duration-300 ${
                              !adminSideBarState.status &&
                              "opacity-0 overflow-hidden"
                            }`}
                          >
                            Settings
                          </span>
                        </span>
                      </span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        <li>
                          <NavLink
                            to="/admin/setting/user"
                            onClick={() => {
                              if (props.mobile) dispatch(closeAdminSideBar());
                            }}
                            className={(navData) =>
                              navData.isActive
                                ? "flex bg-white text-secondary"
                                : "flex"
                            }
                          >
                            <span className="flex items-center ">
                              <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                                <IoIosArrowForward size={20} />

                                <span
                                  className={`whitespace-pre duration-300 ${
                                    !adminSideBarState.status &&
                                    "opacity-0 overflow-hidden"
                                  }`}
                                >
                                  Users
                                </span>
                              </span>
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </li>
          ) : null}
          <li>
            <NavLink
              to="/admin/faq"
              onClick={() => {
                if (props.mobile) dispatch(closeAdminSideBar());
              }}
              className={(navData) =>
                navData.isActive ? "flex bg-white text-secondary" : "flex"
              }
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <FaQuestionCircle size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !adminSideBarState.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    FAQ
                  </span>
                </span>
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
