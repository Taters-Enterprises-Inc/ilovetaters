import { Fragment } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  selectBSCSideBar,
  toggleBSCSideBar,
} from "../slices/bsc-sidebar.slice";

import { FaBars } from "react-icons/fa";
import { BSCDrawerTabs } from "./bsc-drawer-tabs";

export function BSCDrawerMobile() {
  const BSCSideBarState = useAppSelector(selectBSCSideBar);
  const dispatch = useAppDispatch();
  //   const getAdminSessionState = useAppSelector(selectGetAdminSession);

  return (
    <Drawer
      anchor="left"
      className="lg:hidden"
      sx={{ zIndex: 10 }}
      open={BSCSideBarState.status}
      onClose={() => {
        dispatch(toggleBSCSideBar());
      }}
    >
      <Box className="w-[16rem] relative h-screen bg-secondary font-['Varela_Round'] duration-500  overflow-y-auto overflow-x-hidden">
        <div className="!min-h-[0px] px-4 relative flex justify-end text-white top-5">
          <FaBars
            className={`cursor-pointer ${
              !BSCSideBarState.status && "-translate-x-4"
            }`}
            onClick={() => dispatch(toggleBSCSideBar())}
          />
        </div>

        <div className="flex items-center px-4 gap-x-4">
          <img
            src={require("assets/favicon.png")}
            className={`duration-500 bg-white border-4 rounded-full cursor-pointer border-primary -mt-2
  ${!BSCSideBarState.status && "translate-y-12"}`}
            alt="taters admin logo"
          />
          <h1
            className={`whitespace-pre duration-300 text-white origin-left font-medium -mt-2
          ${
            !BSCSideBarState.status &&
            "opacity-0 translate-x-28 overflow-hidden"
          }`}
          >
            Balance Score Card
          </h1>
        </div>

        <div
          className={`whitespace-pre duration-300 mt-3 px-4 text-white 
                ${
                  !BSCSideBarState.status &&
                  "opacity-0 translate-x-28 overflow-hidden "
                }`}
        >
          <h1>San ka punta?</h1>
          <h2 className="text-xs">To the moon</h2>
        </div>
        <BSCDrawerTabs mobile />
      </Box>
    </Drawer>
  );
}
