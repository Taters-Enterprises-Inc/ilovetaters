import React from "react";
import { TbLogout } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";

export function Head() {
  return (
    <div>
      <div className="relative flex justify-end mt-2.5 mr-4 text-secondary ">
        <MdOutlineNotificationsNone
          className="mr-4 cursor-pointer "
          size={20}
        />
        <TbLogout className="cursor-pointer" size={20} />
      </div>
    </div>
  );
}
