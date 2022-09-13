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
import {
  MdProductionQuantityLimits,
  MdFoodBank,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import "./react.css";

const Sidebar: FC = () => {
  const [open, setOpen] = useState(true);
  const history = useNavigate();

  const SIDEBAR_ITEMS: any = [
    {
      title: (
        <h1
          className={`whitespace-pre duration-300 
  ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
        >
          Orders
        </h1>
      ),
      itemId: "/admin/order",
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
      itemId: "/admin/catering",
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
      itemId: "/admin/popclub",
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
      itemId: "#",
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
          itemId: "/admin/raffle/snackshop",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
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
          itemId: "/admin/raffle/instore",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
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
      itemId: "##",
      elemBefore: () => <MdProductionQuantityLimits size={20} />,
      subNav: [
        {
          title: (
            <h1
              className={`whitespace-pre duration-300 
  ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
            >
              Product Availability
            </h1>
          ),
          itemId: "/admin/availability/product",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
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
          itemId: "/admin/availability/product-add-on",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
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
          itemId: "/admin/availability/package",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
        },
        {
          title: (
            <h1
              className={`whitespace-pre duration-300 
  ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
            >
              Catering Add-on Availability
            </h1>
          ),
          itemId: "/admin/availability/catering-add-on",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
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
          itemId: "/admin/availability/banner",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
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
      itemId: "/admin/product",
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
      itemId: "/admin/report",
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
      itemId: "###",
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
          itemId: "/admin/setting/category",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
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
          itemId: "/admin/setting/user",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
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
          itemId: "/admin/setting/voucher",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
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
          itemId: "/admin/setting/store",
          elemBefore: () => <MdKeyboardArrowRight size={20} />,
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
      itemId: "/admin/faq",
      // icon: FaQuestionCircle,
      elemBefore: () => <FaQuestionCircle size={20} />,
    },
  ];

  // const [subnav, setSubnav] = useState(false);
  // const showSubnav = () => setSubnav(!subnav);

  return (
    <div className="flex ">
      <div
        className={`${
          open ? "w-64" : "w-20"
        } relative h-screen bg-secondary px-4 font-["Roboto"] duration-500 overflow-y-auto overflow-x-hidden`}
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
            className={`duration-500 bg-white border-4 rounded-full cursor-pointer border-primary -mt-2
            ${!open && "translate-y-12"}`}
            alt="taters admin logo"
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
                  if (itemId) history(itemId);
                  // maybe push to the route
                }}
                items={SIDEBAR_ITEMS}
              />
            </>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
