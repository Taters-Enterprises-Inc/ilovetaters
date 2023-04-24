import { closeBSCSideBar } from "features/bsc/presentation/slices/bsc-sidebar.slice";
import { logoutBsc } from "features/bsc/presentation/slices/logout-bsc.slice";
import { useState } from "react";
import { HiUsers } from "react-icons/hi";
import { MdDashboardCustomize, MdExpandMore } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import {
  RiQuestionAnswerFill,
  RiQuestionnaireLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Hidden,
} from "@mui/material";
import { FaQuestionCircle } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { useAppSelector } from "features/config/hooks";
import { selectAuditSideBar } from "../slices/audit-sidebar-slice";

const NavigationItems = [
  {
    text: "Dashboard",
    path: "dashboard",
    icon: <MdDashboardCustomize size={20} />,
  },
  {
    text: "Response",
    path: "response",
    icon: <RiQuestionAnswerFill size={20} />,
  },
];

const SettingsItems = [
  {
    text: "Edit Questions",
    path: "settings/questions",
    icon: <RiQuestionnaireLine size={20} />,
  },
  {
    text: "Manage Users",
    path: "settings/users",
    icon: <RiUserSettingsLine size={20} />,
  },
];

const Settings = (status: boolean) => {
  const [expanded, setExpanded] = useState(false);

  const handleOnClick = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  return (
    <>
      <Accordion sx={{ backgroundColor: "inherit", boxShadow: "none" }}>
        <AccordionSummary
          sx={{
            backgroundColor: "inherit",
            "& .MuiAccordionSummary-content ": {
              marginY: 0,
              marginRight: "112px",
            },
            "& .Mui-expanded ": { marginY: expanded ? 0 : undefined },
          }}
          onClick={handleOnClick}
          expandIcon={<MdExpandMore className={`text-white`} size={20} />}
        >
          <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center text-white">
            <IoSettings size={20} />
            <span
              className={`whitespace-pre text-white duration-300 ${
                !status && "opacity-0 overflow-hidden"
              }`}
            >
              Settings
            </span>
          </span>
        </AccordionSummary>

        {SettingsItems.map((item, index) => {
          const { text, path, icon } = item;
          const key = index;
          return (
            <AccordionDetails key={key} sx={{ padding: 0 }}>
              <NavLink
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
                        !status && "opacity-0 overflow-hidden"
                      }`}
                    >
                      {text}
                    </span>
                  </span>
                </span>
              </NavLink>
            </AccordionDetails>
          );
        })}
      </Accordion>
    </>
  );
};

const Navigation = (status: boolean) => {
  return (
    <>
      {NavigationItems.map((items, index) => {
        const { text, path, icon } = items;
        return (
          <NavLink
            key={index}
            to={path}
            className={(navData) =>
              navData.isActive ? "flex bg-white text-secondary" : "flex"
            }
          >
            <span className="flex items-center px-4 ">
              <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                {icon}
                <span
                  className={`whitespace-pre duration-300 ${
                    !status && "opacity-0 overflow-hidden"
                  }`}
                >
                  {text}
                </span>
              </span>
            </span>
          </NavLink>
        );
      })}
    </>
  );
};

export function AuditDrawerMenu() {
  const adminSideBarState = useAppSelector(selectAuditSideBar);

  return (
    <div className="relative flex flex-col pb-4 m-0 mt-5 text-sm text-white">
      <nav>
        <ul>
          <li>{Navigation(adminSideBarState.status)}</li>
          <li className="flex">{Settings(adminSideBarState.status)}</li>
          <li>
            <button
              onClick={() => {
                // dispatch(logoutBsc());
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
