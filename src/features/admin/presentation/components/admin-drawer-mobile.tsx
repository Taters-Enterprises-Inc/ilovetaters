import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Fragment } from "react";
import {
  selectAdminSideBar,
  toggleAdminSideBar,
} from "../slices/admin-sidebar.slice";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";

import { FaBars } from "react-icons/fa";
import { AdminDrawerTabs } from ".";
import { IconButton } from "@mui/material";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function AdminDrawerMobile() {
  const adminSideBarState = useAppSelector(selectAdminSideBar);
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const navigate = useNavigate();

  return (
    <Drawer
      anchor="left"
      className="lg:hidden"
      sx={{ zIndex: 10 }}
      open={adminSideBarState.status}
      onClose={() => {
        dispatch(toggleAdminSideBar());
      }}
    >
      <Box className="w-[16rem] relative h-screen bg-secondary font-['Varela_Round'] duration-500  overflow-y-auto overflow-x-hidden">
        <div className="!min-h-[0px] px-4 relative flex justify-end text-white top-5">
          <FaBars
            className={`cursor-pointer ${
              !adminSideBarState.status && "-translate-x-4"
            }`}
            onClick={() => dispatch(toggleAdminSideBar())}
          />
        </div>

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
        <div>
          <IconButton
            onClick={() => {
              navigate("/admin/landing");
            }}
            sx={{ width: "100%" }}
          >
            <div className="flex text-white text-sm space-x-2 mt-2 w-full">
              <BsArrowReturnLeft />
              <span>Return to menu page</span>
            </div>
          </IconButton>
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
              <div className="text-base">
                {getAdminSessionState.data.admin.user_details.first_name}{" "}
                {getAdminSessionState.data.admin.user_details.last_name}
              </div>

              <div className="text-xs">
                {getAdminSessionState.data.admin.user_details.groups.map(
                  (group, i) => (
                    <span key={i}>
                      {getAdminSessionState.data &&
                      i !==
                        getAdminSessionState.data.admin.user_details.groups
                          .length -
                          1
                        ? group.name + ", "
                        : group.name}
                    </span>
                  )
                )}
              </div>
            </div>
          ) : null}
        </div>
        <AdminDrawerTabs mobile />
      </Box>
    </Drawer>
  );
}
