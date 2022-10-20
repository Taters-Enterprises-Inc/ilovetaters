import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { NavLink, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// icons
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineIdcard } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { RiUser2Fill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

import { useState } from "react";
import { truncate } from "fs";
import Badge from "@mui/material/Badge";

import { closeBSCSideBar, selectBSCSideBar } from "../slices/bsc-sidebar.slice";

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

export interface BSCDrawerTabsProps {
  mobile?: boolean;
}

export function BSCDrawerTabs(props: BSCDrawerTabsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const BSCSideBarState = useAppSelector(selectBSCSideBar);
  //   const getAdminSessionState = useAppSelector(selectGetAdminSession);
  //   const logoutAdminState = useAppSelector(selectLogoutAdmin);

  return (
    <div className="relative flex flex-col pb-4 m-0 mt-2 text-sm text-white">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/bsc/employee"
              onClick={() => {
                if (props.mobile) dispatch(closeBSCSideBar());
              }}
              className={(navData) =>
                navData.isActive ? "flex bg-white text-secondary" : "flex"
              }
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <RiUser2Fill size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !BSCSideBarState.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    Employees
                  </span>
                </span>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bsc/users"
              onClick={() => {
                if (props.mobile) dispatch(closeBSCSideBar());
              }}
              className={(navData) =>
                navData.isActive ? "flex bg-white text-secondary" : "flex"
              }
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <HiUsers size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !BSCSideBarState.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    Users
                  </span>
                </span>
              </span>
            </NavLink>
          </li>
          <li>
            <button
              // onClick={() => {
              //   dispatch(logoutAdmin());
              // }}
              className="flex w-full"
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <TbLogout size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !BSCSideBarState.status && "opacity-0 overflow-hidden"
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
