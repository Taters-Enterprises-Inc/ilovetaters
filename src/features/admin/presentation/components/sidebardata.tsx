import React from "react";
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
import { Link } from "react-router-dom";
import { SidebarItem } from "../models/sidebaritems";

export const Menus: SidebarItem[] = [
  {
    name: "Orders",
    link: "/orders",
    icon: FaRegListAlt,
  },
  {
    name: "Catering",
    link: "/catering",
    icon: MdFoodBank,
  },
  {
    name: "Popclub",
    link: "/popclub",
    icon: FaCartArrowDown,
  },
  {
    name: "Raffles",
    link: "/raffles",
    icon: FaTicketAlt,
    iconClosed: MdOutlineKeyboardArrowDown,
    iconOpened: MdOutlineKeyboardArrowUp,
    subNav: [
      {
        name: "Snackshop",
        link: "/raffles/snackshop",
        icon: FaTicketAlt,
      },
      {
        name: "In-Store",
        link: "/raffles/in-store",
        icon: FaTicketAlt,
      },
    ],
  },
  {
    name: "Availability",
    link: "/availability",
    icon: MdProductionQuantityLimits,
    iconClosed: MdOutlineKeyboardArrowDown,
    iconOpened: MdOutlineKeyboardArrowUp,
  },
  {
    name: "Products",
    link: "/products",
    icon: GiCardboardBoxClosed,
  },
  {
    name: "Reports",
    link: "/reports",
    icon: TbReport,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: MdOutlineSettings,
    iconClosed: MdOutlineKeyboardArrowDown,
    iconOpened: MdOutlineKeyboardArrowUp,
  },
  {
    name: "FAQ's",
    link: "/faqs",
    icon: FaQuestionCircle,
  },
];
