import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarItem } from "../models/sidebaritems";

type SidebarLinkProps = {
  menu: SidebarItem;
};

const Submenu: FC<SidebarLinkProps> = ({ menu }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link to={menu.link} onClick={menu.subNav && showSubnav}>
        <div>
          {menu.icon}
          {menu.name}
        </div>
        <div>
          {menu?.subNav && subnav
            ? menu?.iconOpened
            : menu?.subNav
            ? menu?.iconClosed
            : null}
        </div>
      </Link>
      {subnav &&
        menu?.subNav?.map((menu, i) => {
          return (
            <Link to={menu.link} key={i}>
              {menu.icon}
              {menu.name}
            </Link>
          );
        })}
    </>
  );
};

export default Submenu;
