import { useEffect, useState } from "react";
import {
  MdDashboardCustomize,
  MdExpandMore,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { RiQuestionAnswerFill, RiQuestionnaireLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { GrNext } from "react-icons/gr";
import { selectstockOrderSideBar } from "../slices/stock-order.slice";

export function StockOrderDrawerMenu() {
  const stockOrderSideBarState = useAppSelector(selectstockOrderSideBar);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuitems = [
    {
      text: "Dashboard",
      path: "dashboard",
      icon: <MdDashboardCustomize size={20} />,
    },
    {
      text: "Order",
      path: "order",
      icon: <MdDashboardCustomize size={20} />,
    },
  ];

  //   useEffect(() => {
  //     if (logoutAuditState.status === LogoutAuditState.success) {
  //       dispatch(getAdminSession());
  //       dispatch(resetLogoutAudit());
  //       navigate("/internal");
  //     }
  //   }, [logoutAuditState, dispatch, navigate]);

  return (
    <div className="relative flex flex-col pb-4 m-0 mt-10 text-sm text-white">
      <nav>
        <ul>
          <li className="flex flex-col">
            {menuitems.map((item, index) => {
              const { text, path, icon } = item;
              const key = index;
              return (
                <NavLink
                  key={key}
                  to={path}
                  className={(navData) =>
                    navData.isActive
                      ? "flex bg-white text-secondary"
                      : "flex text-white"
                  }
                >
                  <span className="flex items-center px-4 ">
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
              );
            })}
          </li>

          {/* <li>
            <button
              onClick={() => {
                // dispatch(logoutAudit());
              }}
              className="flex w-full"
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <TbLogout size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !stockOrderSideBarState.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    Logout
                  </span>
                </span>
              </span>
            </button>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
