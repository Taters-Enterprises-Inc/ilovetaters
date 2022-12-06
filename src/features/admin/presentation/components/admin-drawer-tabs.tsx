import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  closeAdminSideBar,
  selectAdminSideBar,
} from "../slices/admin-sidebar.slice";
import {
  getAdminSession,
  selectGetAdminSession,
} from "../slices/get-admin-session.slice";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
  FaRegListAlt,
  FaCartArrowDown,
  FaQuestionCircle,
  FaUserCheck,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdFoodBank,
  MdOutlineSettings,
  MdProductionQuantityLimits,
} from "react-icons/md";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { truncate } from "fs";
import { AiOutlineIdcard } from "react-icons/ai";
import { TbFileCheck } from "react-icons/tb";

import Badge from "@mui/material/Badge";
import { TbLogout } from "react-icons/tb";
import {
  logoutAdmin,
  LogoutAdminState,
  resetLogoutAdmin,
  selectLogoutAdmin,
} from "../slices/logout-admin.slice";
import { useEffect } from "react";
import {
  getAdminNotifications,
  selectGetAdminNotifications,
} from "../slices/get-admin-notifications.slice";
import { TbReportSearch } from "react-icons/tb";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const adminSideBarState = useAppSelector(selectAdminSideBar);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const logoutAdminState = useAppSelector(selectLogoutAdmin);
  const getAdminNotificationsState = useAppSelector(
    selectGetAdminNotifications
  );

  useEffect(() => {
    dispatch(getAdminNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (logoutAdminState.status === LogoutAdminState.success) {
      dispatch(getAdminSession());
      dispatch(resetLogoutAdmin());
      navigate("/admin");
    }
  }, [logoutAdminState, dispatch, navigate]);

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
                  <Badge
                    badgeContent={
                      getAdminNotificationsState.data?.snackshop_order
                        .unseen_notifications_count
                    }
                    color="primary"
                  >
                    <FaRegListAlt size={20} />
                  </Badge>

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

          {getAdminSessionState.data?.admin.is_admin ||
          getAdminSessionState.data?.admin.is_catering_admin ||
          getAdminSessionState.data?.admin.is_csr_admin ? (
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
                    <Badge
                      badgeContent={
                        getAdminNotificationsState.data?.catering_booking
                          .unseen_notifications_count
                      }
                      color="primary"
                    >
                      <MdFoodBank size={20} />
                    </Badge>

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
                  <Badge
                    badgeContent={
                      getAdminNotificationsState.data?.popclub_redeem
                        .unseen_notifications_count
                    }
                    color="primary"
                  >
                    <FaCartArrowDown size={20} />
                  </Badge>
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
            <NavLink
              to="/admin/user-discount"
              onClick={() => {
                if (props.mobile) dispatch(closeAdminSideBar());
              }}
              className={(navData) =>
                navData.isActive ? "flex bg-white text-secondary" : "flex"
              }
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <AiOutlineIdcard size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !adminSideBarState.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    User Discount
                  </span>
                </span>
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/survey-verification"
              onClick={() => {
                if (props.mobile) dispatch(closeAdminSideBar());
              }}
              className={(navData) =>
                navData.isActive ? "flex bg-white text-secondary" : "flex"
              }
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <TbFileCheck size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !adminSideBarState.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    Survey Verification
                  </span>
                </span>
              </span>
            </NavLink>
          </li>

          <li>
            <div className="flex px-4">
              <div className="flex-1">
                <Accordion>
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
                              ? "flex bg-white text-secondary "
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
                                Deals
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
                                Shop Products
                              </span>
                            </span>
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/admin/availability/caters-package"
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
                                Caters Packages
                              </span>
                            </span>
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/admin/availability/caters-package-addon"
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
                                Caters Package Add-ons
                              </span>
                            </span>
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/admin/availability/caters-product-addon"
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
                                Caters Product Add-ons
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
          <li>
            <div className="flex px-4">
              <div className="flex-1">
                <Accordion>
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
                      {getAdminSessionState.data?.admin.is_admin ? (
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
                      ) : null}
                      <li>
                        <NavLink
                          to="/admin/setting/store"
                          onClick={() => {
                            // toggle2();
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
                                Store
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
          <li>
            <NavLink
              to="/admin/reports"
              onClick={() => {
                if (props.mobile) dispatch(closeAdminSideBar());
              }}
              className={(navData) =>
                navData.isActive ? "flex bg-white text-secondary" : "flex"
              }
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <TbReportSearch size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !adminSideBarState.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    Reports
                  </span>
                </span>
              </span>
            </NavLink>
          </li>

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
          <li>
            <button
              onClick={() => {
                dispatch(logoutAdmin());
              }}
              className="flex w-full"
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <TbLogout size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !adminSideBarState.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    Logout
                  </span>
                </span>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
