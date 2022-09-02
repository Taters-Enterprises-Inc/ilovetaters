import React, { FC, useState } from "react";
import { Menus } from "./sidebardata";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Submenu from "./submenu1";

const Sidebar: FC = () => {
  const [open, setOpen] = useState(true);

  // const [subnav, setSubnav] = useState(false);
  // const showSubnav = () => setSubnav(!subnav);

  return (
    <div className="flex ">
      <div
        className={`${
          open ? "w-64" : "w-20"
        } relative h-screen bg-primary px-4 font-["Roboto"] duration-500 overflow-y-auto overflow-x-hidden`}
      >
        <div className="relative flex justify-end text-white top-5">
          <FaBars
            className={`cursor-pointer ${!open && "-translate-x-4"}`}
            onClick={() => setOpen(!open)}
          ></FaBars>
        </div>

        <div className="flex items-center pl-1 gap-x-4">
          <img
            src={require("assets/favicon.png")}
            className={`duration-500 bg-white border-4 rounded-full cursor-pointer border-tertiary -mt-2
            ${!open && "translate-y-12"}`}
          />
          <h1
            className={`whitespace-pre duration-300 text-white origin-left font-medium -mt-2
                    ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
          >
            TEI Shop Admin
          </h1>
        </div>

        <div
          className={`whitespace-pre duration-300 mt-3 text-white 
                ${!open && "opacity-0 translate-x-28 overflow-hidden "}`}
        >
          <h3 className="cursor-pointer">Administrator</h3>
          <h4 className="text-xs cursor-pointer">Admin, Members</h4>
        </div>

        <div className="relative flex flex-col pb-4 mt-3 text-sm text-white">
          <Submenu />
          {/* {Menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              // onClick={menu.subNav && showSubnav}
              className="flex items-center gap-3 p-2 duration-200 rounded-md hover:bg-white/30"
            >
              <div className="ml-1.5">
                {React.createElement(menu?.icon, { size: 20 })}
              </div>
              <h2
                className={`whitespace-pre duration-300 
                        ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {/* {menu?.name} */}
          {/* </h2>
              <Submenu menu={menu} key={i} /> */}
          {/* <div>
                {menu.subNav && subnav
                  ? menu.iconOpen
                  : menu.subNav
                  ? menu.iconClosed
                  : null}
              </div> */}
          {/* </Link>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
