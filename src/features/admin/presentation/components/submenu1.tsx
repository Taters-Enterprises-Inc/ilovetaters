import React, { FC, useState } from "react";
import { ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigation } from "react-minimal-side-navigation";
import { SidebarItem } from "../models/sidebaritems";
import { Menus } from "./sidebardata";
import {
  FaBars,
  FaRegListAlt,
  FaCartArrowDown,
  FaTicketAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdProductionQuantityLimits, MdFoodBank } from "react-icons/md";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import {
  MdOutlineSettings,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import "./react.css";

function Submenu() {
  const history = useNavigate();
  const [open, setOpen] = useState(true);

  return (
    <React.Fragment>
      <>
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId="/admin/orders"
          onSelect={({ itemId }) => {
            history(itemId);
            // maybe push to the route
          }}
          items={[
            {
              title: (
                <h1
                  className={`${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Orders
                </h1>
              ),
              itemId: "/orders",
              // icon: FaRegListAlt,
              elemBefore: () => <FaRegListAlt className="relative flex " />,
            },
            {
              title: "Catering",
              itemId: "/catering",
              // icon: MdFoodBank,
              elemBefore: () => <MdFoodBank />,
            },
            {
              title: "Popclub",
              itemId: "/popclub",
              // icon: FaCartArrowDown,
              elemBefore: () => <FaCartArrowDown />,
            },
            {
              title: "Raffles",
              itemId: "",
              // icon: FaTicketAlt,
              // iconClosed: MdOutlineKeyboardArrowDown,
              // iconOpened: MdOutlineKeyboardArrowUp,
              elemBefore: () => <FaTicketAlt />,
              subNav: [
                {
                  title: "Snackshop",
                  itemId: "/raffles/snackshop",
                  // icon: FaTicketAlt,
                },
                {
                  title: "In-Store",
                  itemId: "/raffles/in-store",
                  // icon: FaTicketAlt,
                },
              ],
            },
            {
              title: "Availability",
              itemId: "#",
              // icon: MdProductionQuantityLimits,
              // iconClosed: MdOutlineKeyboardArrowDown,
              // iconOpened: MdOutlineKeyboardArrowUp,
              elemBefore: () => <MdProductionQuantityLimits />,
              subNav: [
                {
                  title: "Catering Add-on Availability",
                  itemId: "/raffles/snackshop",
                },
                {
                  title: "Product Add-on Availability",
                  itemId: "/raffles/snackshop",
                },
              ],
            },
            {
              title: "Products",
              itemId: "/products",
              // icon: GiCardboardBoxClosed,
              elemBefore: () => <GiCardboardBoxClosed />,
            },
            {
              title: "Reports",
              itemId: "/reports",
              // icon: TbReport,
              elemBefore: () => <TbReport />,
            },
            {
              title: "Settings",
              itemId: "##",
              // icon: MdOutlineSettings,
              // iconClosed: MdOutlineKeyboardArrowDown,
              // iconOpened: MdOutlineKeyboardArrowUp,
              elemBefore: () => <MdOutlineSettings />,
              subNav: [
                {
                  title: "Catering Add-on Availability",
                  itemId: "/raffles/snackshop",
                },
                {
                  title: "Product Add-on Availability",
                  itemId: "/raffles/snackshop",
                },
              ],
            },
            {
              title: "FAQ's",
              itemId: "/faqs",
              // icon: FaQuestionCircle,
              elemBefore: () => <FaQuestionCircle />,
            },
          ]}
        />
      </>
    </React.Fragment>
  );
}

export default Submenu;

// function Submenu({ item }: { item: any }) {
//   const [active, setActive] = useState(false);

//   if (item.subNav) {
//     return (
//       <div className={active ? "sidebar-item active" : "sidebar-item"}>
//         <div>
//           <span>
//             {item.icon && <i className="item.icon"></i>}
//             {item.name}
//           </span>
//           <i
//             className="MdOutlineKeyboardArrowDown"
//             onClick={() => setActive(!active)}
//           ></i>
//         </div>
//         <div className="sidebar-content">
//           {item.subNav.map((child: any, index: any) => (
//             <Submenu key={index} item={child} />
//           ))}
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <a href={item.link} className="sidebar-item">
//         <div className="sidebar-title">
//           <span>
//             {item.icon && <i className="item.icon"></i>}
//             {item.text}
//           </span>
//         </div>
//       </a>
//     );
//   }
// }

// export default Submenu;

// type SidebarLinkProps = {
//   menu: SidebarItem;
// };

// const Submenu: FC<SidebarLinkProps> = ({ menu }) => {
//   const [subNav, setSubnav] = useState(false);
//   const showSubnav = () => setSubnav(!subNav);

//   return (
//     <>
//       <Link to={menu.link} onClick={menu.subNav && showSubnav}>
//         <div>
//           {menu.icon}
//           {menu.name}
//         </div>
//         <div>
//           {menu.subNav && subNav
//             ? menu.iconOpened
//             : menu.subNav
//             ? menu.iconClosed
//             : null}
//         </div>
//       </Link>
//       {subNav &&
//         menu?.subNav?.map((menu, i) => {
//           return (
//             <Link to={menu.link} key={i}>
//               {menu.icon}
//               {menu.name}
//             </Link>
//           );
//         })}
//     </>
//   );
// };

// export default Submenu;
