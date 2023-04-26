import { useEffect, useState } from "react";
import { MdDashboardCustomize, MdExpandMore } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { RiQuestionAnswerFill, RiQuestionnaireLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectAuditSideBar } from "../slices/audit-sidebar-slice";
import {
  LogoutAuditState,
  logoutAudit,
  resetLogoutAudit,
  selectLogoutAudit,
} from "../slices/logout-audit.slice";
import { getAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";

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
  const AuditSideBarState = useAppSelector(selectAuditSideBar);
  const logoutAuditState = useAppSelector(selectLogoutAudit);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutAuditState.status === LogoutAuditState.success) {
      dispatch(getAdminSession());
      dispatch(resetLogoutAudit());
      navigate("/internal/audit");
    }
  }, [logoutAuditState, dispatch, navigate]);

  return (
    <div className="relative flex flex-col pb-4 m-0 mt-5 text-sm text-white">
      <nav>
        <ul>
          <li>{Navigation(AuditSideBarState.status)}</li>
          <li className="flex">{Settings(AuditSideBarState.status)}</li>
          <li>
            <button
              onClick={() => {
                dispatch(logoutAudit());
              }}
              className="flex w-full"
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <TbLogout size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !AuditSideBarState.status && "opacity-0 overflow-hidden"
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
