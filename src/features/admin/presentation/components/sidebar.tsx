import React, { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigation } from "react-minimal-side-navigation";
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
import { MdOutlineSettings } from "react-icons/md";
import "./react.css";

const Sidebar: FC = () => {
  const [open, setOpen] = useState(true);
  const history = useNavigate();

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
                        className={`whitespace-pre duration-300 
                ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                      >
                        Orders
                      </h1>
                    ),
                    itemId: "/orders",
                    // icon: FaRegListAlt,
                    elemBefore: () => <FaRegListAlt size={20} />,
                  },
                  {
                    title: (
                      <h1
                        className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                      >
                        Catering
                      </h1>
                    ),
                    itemId: "/catering",
                    // icon: MdFoodBank,
                    elemBefore: () => <MdFoodBank size={20} />,
                  },
                  {
                    title: (
                      <h1
                        className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                      >
                        Popclub
                      </h1>
                    ),
                    itemId: "/popclub",
                    // icon: FaCartArrowDown,
                    elemBefore: () => <FaCartArrowDown size={20} />,
                  },
                  {
                    title: (
                      <h1
                        className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                      >
                        Raffles
                      </h1>
                    ),
                    itemId: "",
                    elemBefore: () => <FaTicketAlt size={20} />,
                    subNav: [
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
                ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            Snackshop
                          </h1>
                        ),
                        itemId: "/raffles/snackshop",
                      },
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
                ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            In-store
                          </h1>
                        ),
                        itemId: "/raffles/in-store",
                      },
                    ],
                  },
                  {
                    title: (
                      <h1
                        className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                      >
                        Availability
                      </h1>
                    ),
                    itemId: "#",
                    elemBefore: () => <MdProductionQuantityLimits size={20} />,
                    subNav: [
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
                ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            Catering Add-on Availability
                          </h1>
                        ),
                        itemId: "/raffles/snackshop",
                      },
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
                ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            Product Add-on Availability
                          </h1>
                        ),
                        itemId: "/raffles/snackshop",
                      },
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
                ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            Product Availability
                          </h1>
                        ),
                        itemId: "/raffles/snackshop",
                      },
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
                ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            Packages Availability
                          </h1>
                        ),
                        itemId: "/raffles/snackshop",
                      },
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
                ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            Banner Availability
                          </h1>
                        ),
                        itemId: "/raffles/snackshop",
                      },
                    ],
                  },
                  {
                    title: (
                      <h1
                        className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                      >
                        Products
                      </h1>
                    ),
                    itemId: "/products",
                    elemBefore: () => <GiCardboardBoxClosed size={20} />,
                  },
                  {
                    title: (
                      <h1
                        className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                      >
                        Reports
                      </h1>
                    ),
                    itemId: "/reports",
                    elemBefore: () => <TbReport size={20} />,
                  },
                  {
                    title: (
                      <h1
                        className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                      >
                        Settings
                      </h1>
                    ),
                    itemId: "##",
                    elemBefore: () => <MdOutlineSettings size={20} />,
                    subNav: [
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            Category
                          </h1>
                        ),
                        itemId: "/raffles/snackshop",
                      },
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            Users
                          </h1>
                        ),
                        itemId: "/raffles/snackshop",
                      },
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            Vouchers
                          </h1>
                        ),
                        itemId: "/raffles/snackshop",
                      },
                      {
                        title: (
                          <h1
                            className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                          >
                            Stores
                          </h1>
                        ),
                        itemId: "/raffles/snackshop",
                      },
                    ],
                  },
                  {
                    title: (
                      <h1
                        className={`whitespace-pre duration-300 
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                      >
                        FAQ's
                      </h1>
                    ),
                    itemId: "/faqs",
                    // icon: FaQuestionCircle,
                    elemBefore: () => <FaQuestionCircle size={20} />,
                  },
                ]}
              />
            </>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
