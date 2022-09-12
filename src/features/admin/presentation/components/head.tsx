import React, { ReactNode } from "react";
import { TbLogout } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { PageTitle } from "./page-title";

export function Head() {
  return (
    <div className="relative flex justify-between">
      <div className="xl:-ml-16 lg:-ml-12 md:-ml-4 mt-2.5">
        <PageTitle
          home={{
            title: "Home",
            url: "/",
          }}
        />
      </div>
      <div className="relative flex justify-end mt-2.5 mr-4 text-white ">
        <MdOutlineNotificationsNone className="mr-4 cursor-pointer" size={20} />
        <TbLogout className="cursor-pointer" size={20} />
      </div>
    </div>
  );
}
