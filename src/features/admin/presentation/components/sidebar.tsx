import React, { useState } from "react";
import { Menus } from "./sidebardata";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Sidebar() {
  const [open, setOpen] = useState(true);
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <div className="flex ">
      <div
        className={`${
          open ? "w-64" : "w-20"
        } relative min-h-screen bg-primary px-4 font-["Roboto"] duration-500`}
      >
        <div className="relative flex justify-end text-white top-7">
          <FaBars
            className={`cursor-pointer ${!open && "-translate-x-4"}`}
            onClick={() => setOpen(!open)}
          ></FaBars>
        </div>

        <div className="flex items-center pl-1 gap-x-4">
          <img
            src={require("assets/favicon.png")}
            className={`duration-500 bg-white border-4 rounded-full cursor-pointer border-tertiary 
            ${!open && "translate-y-12"}`}
          />
          <h1
            className={`whitespace-pre duration-300 text-white origin-left font-medium 
                    ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
          >
            TEI Shop Admin
          </h1>
        </div>

        <div
          className={`whitespace-pre duration-300 mt-4 text-white 
                ${!open && "opacity-0 translate-x-28 overflow-hidden "}`}
        >
          <h3 className="cursor-pointer">Administrator</h3>
          <h4 className="text-xs cursor-pointer">Admin, Members</h4>
        </div>

        <div className="relative flex flex-col pb-4 mt-4 text-sm text-white">
          {Menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              onClick={menu.subNav && showSubnav}
              key={i}
              className="flex items-center gap-3 p-2 duration-200 rounded-md hover:bg-white/30"
            >
              <div className="ml-1.5">
                {React.createElement(menu?.icon, { size: 20 })}
              </div>
              <h2
                className={`whitespace-pre duration-300 
                        ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {menu?.name}
              </h2>
              <div>
                {/* {menu.subNav && subnav ? menu.iconOpen : menu.subNav ? menu.iconClosed : null} */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
