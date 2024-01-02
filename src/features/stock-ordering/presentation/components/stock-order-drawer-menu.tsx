import { useEffect, useState } from "react";
import {
  MdDashboardCustomize,
  MdExpandMore,
  MdOutlineExpandMore,
  MdOutlineListAlt,
  MdOutlineNavigateNext,
  MdOutlinePostAdd,
  MdOutlineStorage,
  MdStoreMallDirectory,
} from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { RiQuestionAnswerFill, RiQuestionnaireLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSettings, IoSettingsSharp } from "react-icons/io5";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getAdminSession,
  selectGetAdminSession,
} from "features/admin/presentation/slices/get-admin-session.slice";
import { GrNext } from "react-icons/gr";
import { selectstockOrderSideBar } from "../slices/stock-order.slice";
import {
  LogoutAdminState,
  logoutAdmin,
  resetLogoutAdmin,
  selectLogoutAdmin,
} from "features/admin/presentation/slices/logout-admin.slice";
import { BsArrowReturnLeft } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import React from "react";

export function StockOrderDrawerMenu() {
  const stockOrderSideBarState = useAppSelector(selectstockOrderSideBar);
  const getLogoutAdminState = useAppSelector(selectLogoutAdmin);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const menuitems = [
    {
      text: "Dashboard",
      path: "dashboard",
      icon: <MdOutlineStorage size={20} />,
      enable: true,
    },
    {
      text: "Order",
      path: "order",
      icon: <MdStoreMallDirectory size={20} />,
      enable: true,
    },
    {
      text: "Task",
      path: "task",
      icon: <MdStoreMallDirectory size={20} />,
      enable: false,
    },
    {
      text: "Profile",
      path: "profile",
      icon: <BsFillPersonFill size={20} />,
      enable: false,
    },
  ];

  useEffect(() => {
    if (getLogoutAdminState.status === LogoutAdminState.success) {
      dispatch(getAdminSession());
      dispatch(resetLogoutAdmin());
      navigate("/admin");
    }
  }, [getLogoutAdminState, dispatch, navigate]);

  const enableAddProducts = () => {
    const persmission =
      getAdminSessionState.data?.admin.user_details.sos_groups.some(
        (permissions) =>
          permissions.id === 1 ||
          permissions.id === 4 ||
          permissions.id === 7 ||
          permissions.id === 9
      );

    return persmission;
  };

  const settingsMenuItems = [
    {
      text: "Products",
      path: "settings/products",
      icon: <MdOutlinePostAdd size={20} />,
      enable: enableAddProducts(),
    },
  ];

  return (
    <div className="relative flex flex-col pb-4 m-0 mt-10 text-sm text-white">
      <nav>
        <ul>
          <li className="flex flex-col">
            {menuitems.map((item, index) => {
              const { text, path, icon, enable } = item;
              const key = index;
              return (
                <React.Fragment key={key}>
                  {enable && (
                    <NavLink
                      to={path}
                      className={(navData) =>
                        navData.isActive
                          ? "flex bg-white text-secondary"
                          : "flex text-white"
                      }
                    >
                      <span className="flex items-center px-4">
                        <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                          {icon}
                          <span
                            className={`whitespace-pre duration-300 ${
                              !stockOrderSideBarState.status &&
                              "opacity-0 overflow-hidden"
                            }`}
                          >
                            {text}
                          </span>
                        </span>
                      </span>
                    </NavLink>
                  )}
                </React.Fragment>
              );
            })}

            {enableAddProducts() &&
            <Accordion
              onChange={(event, isExplanded) => {
                setSettingsExpanded(isExplanded);
              }}
              style={{
                color: "white",
                borderRadius: 0,
                backgroundColor: "#22201A",
                boxShadow: "none",
                paddingLeft: 10,
              }}
            >
              <AccordionSummary
                expandIcon={<MdOutlineExpandMore color="white" size={20} />}
              >
                <div className="flex space-x-4">
                  <span>
                    <IoSettingsSharp color="white" size={18} />
                  </span>
                  <span
                    className={`whitespace-pre duration-300 ${
                      !stockOrderSideBarState.status && "hidden"
                    }`}
                  >
                    Settings
                  </span>
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                {settingsMenuItems.map((item, index) => {
                  const { text, path, icon, enable } = item;
                  const key = index;
                  return (
                    <React.Fragment key={key}>
                      {enable && (
                        <NavLink
                          to={path}
                          className={(navData) =>
                            navData.isActive
                              ? "flex bg-white text-secondary"
                              : "flex text-white"
                          }
                        >
                          <span className="flex items-center px-4">
                            <span className="flex py-[0.85rem] space-x-4 items-center">
                              {icon}
                              <span
                                className={`whitespace-pre duration-300 ${
                                  !stockOrderSideBarState.status &&
                                  "opacity-0 overflow-hidden"
                                }`}
                              >
                                {text}
                              </span>
                            </span>
                          </span>
                        </NavLink>
                      )}
                    </React.Fragment>
                  );
                })}
              </AccordionDetails>
            </Accordion>}
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
                      !stockOrderSideBarState.status &&
                      "opacity-0 overflow-hidden"
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
