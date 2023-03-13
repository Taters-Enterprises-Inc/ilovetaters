import createTheme from "@mui/material/styles/createTheme";
import {
  FaShoppingBag,
  FaUserAlt,
  FaStoreAlt,
  FaEnvelope,
} from "react-icons/fa";
import { MdPolicy, MdRule } from "react-icons/md";
import { RiShoppingBag3Fill, RiUserHeartLine } from "react-icons/ri";
import { GoLaw } from "react-icons/go";
import { TabModel } from "./presentation/components/tab";
import { GiPopcorn } from "react-icons/gi";
import { HiDocumentText } from "react-icons/hi";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import Pusher from "pusher-js";
import { ReactElement, ReactNode } from "react";
export const REACT_APP_DOMAIN_URL = process.env.REACT_APP_DOMAIN_URL;
export const REACT_APP_BASE_NAME = process.env.REACT_APP_BASE_NAME;

// PUSHER
export const REACT_APP_PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY ?? "";
export const REACT_APP_PUSHER_CLUSTER =
  process.env.REACT_APP_PUSHER_CLUSTER ?? "";

export const pusher = new Pusher(REACT_APP_PUSHER_KEY, {
  cluster: REACT_APP_PUSHER_CLUSTER,
});

export const SERVICES_DESKTOP = [
  {
    title: "Snackshop",
    subtitle: "Online delivery snacks",
    color: "#1d1115",
    textColor: "white",
    backgroundPosition: "100% 100%",
    url: "delivery",
    image: "api/assets/images/home/cards/taters_snackshop.jpg",
  },
  {
    title: "Franchising",
    subtitle: "Investment opportunities",
    color: "#1b1915",
    textColor: "white",
    backgroundPosition: "100% 100%",
    url: "franchising",
    image: "api/assets/images/home/cards/taters_franchising.jpg",
  },
  {
    title: "PopClub",
    subtitle: "Best deals in town",
    color: "#22201A",
    textColor: "white",
    backgroundPosition: "center center",
    url: "popclub",
    image: "api/assets/images/home/cards/taters_popclub.jpg",
  },
  {
    title: "Taters Caters",
    subtitle: "Celebration Snacks",
    color: "#858173",
    textColor: "black",
    backgroundPosition: "100% 100%",
    url: "shop",
    image: "api/assets/images/home/cards/taters_catering.jpg",
  },
  {
    title: "Reseller",
    subtitle: "Community selling",
    color: "#c7b7ad",
    textColor: "black",
    backgroundPosition: "center center",
    url: "reseller",
    image: "api/assets/images/home/cards/taters_reseller.jpg",
  },
  {
    title: "Branches",
    subtitle: "Nationwide Locations",
    color: "#d7cdb7",
    textColor: "black",
    backgroundPosition: "100% 100%",
    url: "branches",
    image: "api/assets/images/home/cards/taters_branches.jpg",
  },
];

export const SERVICES_MOBILE = [
  {
    title: "Snackshop",
    subtitle: "Online delivery snacks",
    color: "#1d1115",
    textColor: "white",
    backgroundPosition: "100% 100%",
    url: "delivery",
    image: "api/assets/images/home/cards/taters_snackshop.jpg",
  },
  {
    title: "Taters Caters",
    subtitle: "Celebration Snacks",
    color: "#858173",
    textColor: "black",
    backgroundPosition: "100% 100%",
    url: "shop",
    image: "api/assets/images/home/cards/taters_catering.jpg",
  },
  {
    title: "Franchising",
    subtitle: "Investment opportunities",
    color: "#1b1915",
    textColor: "white",
    backgroundPosition: "90% 100%",
    url: "franchising",
    image: "api/assets/images/home/cards/taters_franchising.jpg",
  },
  {
    title: "Reseller",
    subtitle: "Community selling",
    color: "#c7b7ad",
    textColor: "black",
    backgroundPosition: "center center",
    url: "reseller",
    image: "api/assets/images/home/cards/taters_reseller.jpg",
  },
  {
    title: "PopClub",
    subtitle: "Best deals in town",
    color: "#22201A",
    textColor: "white",
    backgroundPosition: "center center",
    url: "popclub",
    image: "api/assets/images/home/cards/taters_popclub.jpg",
  },
  {
    title: "Branches",
    subtitle: "Nationwide Locations",
    color: "#d7cdb7",
    textColor: "black",
    backgroundPosition: "100% 100%",
    url: "branches",
    image: "api/assets/images/home/cards/taters_branches.jpg",
  },
];

export const TABS: Array<{
  name: "snackshop" | "popclub" | "catering" | "franchising";
  url: string;
}> = [
  {
    name: "snackshop",
    url: "/delivery",
  },
  {
    name: "popclub",
    url: "/popclub",
  },
  {
    name: "catering",
    url: "/shop",
  },
  {
    name: "franchising",
    url: "/franchising",
  },
];

export const SNACKSHOP_TERMS_AND_CONDITIONS_TABS: Array<TabModel> = [
  {
    name: "Terms And Conditions",
    active: "terms-and-conditions",
    url: "/delivery/terms-and-conditions",
    icon: <MdRule />,
  },
  {
    name: "Privacy Policy",
    active: "privacy-policy",
    url: "/delivery/privacy-policy",
    icon: <MdPolicy />,
  },
  {
    name: "Return Policy",
    active: "return-policy",
    url: "/delivery/return-policy",
    icon: <GoLaw />,
  },
];

export const BSC_TERMS_AND_POLICY_TABS: Array<TabModel> = [
  {
    name: "Terms And Conditions",
    active: "bsc-terms-and-conditions",
    url: "/bsc/terms-and-condition",
    icon: <MdRule />,
  },
  {
    name: "Privacy Policy",
    active: "bsc-privacy-policy",
    url: "/bsc/privacy-policy",
    icon: <MdPolicy />,
  },
  {
    name: "Return Policy",
    active: "bsc-return-policy",
    url: "/bsc/return-policy",
    icon: <GoLaw />,
  },
];

export const ADMIN_FAQ: Array<TabModel> = [
  {
    name: "Store",
    active: "store",
    url: "/admin/faq/store",
    icon: <FaStoreAlt />,
  },
  {
    name: "Customer",
    active: "customer",
    url: "/admin/faq/customer",
    icon: <RiUserHeartLine />,
  },
];

export const SEE_ME_TAB_FAQ: Array<TabModel> = [
  {
    name: "Snackshop",
    active: "snackshop",
    url: "/see_me",
  },
  {
    name: "Catering",
    active: "catering",
    url: "/see_me/catering",
  },
  {
    name: "PopClub",
    active: "popclub",
    url: "/see_me/popclub",
  },
  {
    name: "Reseller",
    active: "reseller",
    url: "/see_me/reseller",
  },
];

export const PROFILE_TABS: Array<TabModel> = [
  {
    name: "My Profile",
    active: "profile",
    icon: <FaUserAlt />,
    url: "/profile",
  },
  {
    name: "Inbox",
    active: "inbox",
    icon: <FaEnvelope />,
    url: "/profile/inbox",
  },
  {
    name: "Snack Shop Orders",
    active: "snackshop",
    icon: <FaShoppingBag />,
    url: "/profile/snackshop-orders",
  },
  {
    name: "Catering Bookings",
    active: "catering",
    icon: <RiShoppingBag3Fill />,
    url: "/profile/catering-bookings",
  },
  {
    name: "Popclub Redeems",
    active: "popclub",
    icon: <GiPopcorn />,
    url: "/profile/popclub-redeems",
  },
  {
    name: "User Discount",
    active: "user-discount",
    icon: <HiDocumentText />,
    url: "/profile/user-discount",
  },
  {
    name: "Influencer",
    active: "influencer",
    icon: <BsFillPersonBadgeFill />,
    url: "/profile/influencer",
  },
];

export const ADMIN_ORDER_MODAL_TABS: Array<TabModel> = [
  {
    name: "Customer Information",
    active: "customerInfo",
    url: "customer-information",
  },
  {
    name: "Order Details",
    active: "orderDetails",
    url: "order-details",
  },
  {
    name: "Audit Logs",
    active: "auditLogs",
    url: "audit-logs",
  },
  {
    name: "Remarks",
    active: "remarks",
    url: "remarks",
  },
];

export const ADMIN_SNACKSHOP_ORDER_STATUS: Array<{
  name: string;
  color: string;
}> = [
  {
    name: "Incomplete Transaction",
    color: "#a21013",
  },
  {
    name: "New",
    color: "#cca300",
  },
  {
    name: "Paid",
    color: "#b32400",
  },
  {
    name: "Confirmed",
    color: "#004d00",
  },
  {
    name: "Declined",
    color: "#a21013",
  },
  {
    name: "Cancelled",
    color: "#a21013",
  },
  {
    name: "Completed",
    color: "#004d00",
  },
  {
    name: "Rejected",
    color: "#a21013",
  },
  {
    name: "Preparing",
    color: "#004d00",
  },
  {
    name: "For Dispatch",
    color: "#400080",
  },
  {
    name: "Error Transaction",
    color: "#a21013",
  },
];

export const ADMIN_POPCLUB_REDEEM_STATUS: Array<{
  name: string;
  color: string;
}> = [
  {
    name: "",
    color: "",
  },
  {
    name: "New",
    color: "#cca300",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "Declined",
    color: "#a21013",
  },
  {
    name: "Cancelled",
    color: "#a21013",
  },
  {
    name: "Completed",
    color: "#004d00",
  },
];

export const ADMIN_USER_DISCOUNT_STATUS: Array<{
  name: string;
  color: string;
}> = [
  {
    name: "",
    color: "",
  },
  {
    name: "Pending",
    color: "#cca300",
  },
  {
    name: "Under Review",
    color: "#cca300",
  },
  {
    name: "Approved",
    color: "#004d00",
  },
  {
    name: "Rejected",
    color: "#a21013",
  },
];

export const ADMIN_INFLUENCER_STATUS: Array<{
  name: string;
  color: string;
}> = [
  {
    name: "",
    color: "",
  },
  {
    name: "Pending",
    color: "#cca300",
  },
  {
    name: "Under Review",
    color: "#cca300",
  },
  {
    name: "Approved",
    color: "#004d00",
  },
  {
    name: "Rejected",
    color: "#a21013",
  },
];

export const ADMIN_SURVEY_VERIFICATION_STATUS: Array<{
  name: string;
  color: string;
}> = [
  {
    name: "",
    color: "",
  },
  {
    name: "Pending",
    color: "#cca300",
  },
  {
    name: "Verified",
    color: "#004d00",
  },
  {
    name: "Rejected",
    color: "#a21013",
  },
];

export const CATERING_BOOKING_STATUS: Array<{
  name: string;
  color: string;
}> = [
  {
    name: "",
    color: "",
  },
  {
    name: "Waiting for booking confirmation",
    color: "#cca300",
  },
  {
    name: "Upload Signed Contract",
    color: "#42032C",
  },
  {
    name: "Contract under verification",
    color: "#541212",
  },
  {
    name: "Upload Initial proof of payment",
    color: "#C84B31",
  },
  {
    name: "Initial proof of payment under verification",
    color: "#153B44",
  },
  {
    name: "Upload Final proof of payment",
    color: "#152A38",
  },
  {
    name: "Final proof of payment under verification",
    color: "#1E5128",
  },
  {
    name: "Payment Verified",
    color: "#4E9F3D",
  },
  {
    name: "Catering booking completed",
    color: "#004d00",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "Booking denied",
    color: "#a21013",
  },
  {
    name: "Contract denied",
    color: "#a21013",
  },
  {
    name: "Initial Payment denied",
    color: "#a21013",
  },
  {
    name: "Final Payment denied",
    color: "#a21013",
  },
];

export const ADMIN_CATERING_BOOKING_STATUS: Array<{
  name: string;
  color: string;
}> = [
  {
    name: "",
    color: "",
  },
  {
    name: "Waiting for booking confirmation",
    color: "#cca300",
  },
  {
    name: "Booking Confirmed",
    color: "#42032C",
  },
  {
    name: "Contract Uploaded",
    color: "#541212",
  },
  {
    name: "Contract Verified",
    color: "#C84B31",
  },
  {
    name: "Initial Payment Uploaded",
    color: "#153B44",
  },
  {
    name: "Initial Payment Verified",
    color: "#152A38",
  },
  {
    name: "Final Payment Uploaded",
    color: "#1E5128",
  },
  {
    name: "Final payment verified",
    color: "#4E9F3D",
  },
  {
    name: "Catering booking completed",
    color: "#004d00",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "Booking denied",
    color: "#a21013",
  },
  {
    name: "Contract denied",
    color: "#a21013",
  },
  {
    name: "Initial Payment denied",
    color: "#a21013",
  },
  {
    name: "Final Payment denied",
    color: "#a21013",
  },
];

export const ADMIN_SNACKSHOP_TRANSACTION_LOGS_ACTION_STATUS: Array<{
  name: string;
  color: string;
}> = [
  { name: "", color: "" },
  {
    name: "Update",
    color: "#cca300",
  },
  {
    name: "Accept",
    color: "#004d00",
  },
  {
    name: "Error",
    color: "#a21013",
  },
];

export const ADMIN_SNACKSHOP_MOP_STATUS = [
  "' - '",
  "BPI",
  "BDO",
  "CASH",
  "GCASH",
  "PAYMAYA",
  "ROBINSONS-BANK",
  "CHINABANK",
];

export const ORDER_STATUS: Array<{
  name: string;
  color: string;
}> = [
  {
    name: "Not Applicable",
    color: "#a21013",
  },
  {
    name: "Order Placed in System",
    color: "#004d00",
  },
  {
    name: "Payment under Verification",
    color: "#cca300",
  },
  {
    name: "Payment Confirmed",
    color: "#004d00",
  },
  {
    name: "Order Declined",
    color: "#a21013",
  },
  {
    name: "Order Cancelled",
    color: "#a21013",
  },
  {
    name: "Product Received by Customer",
    color: "#004d00",
  },
  {
    name: "Order Rejected due to Incorrect/Incomplete Payment",
    color: "#a21013",
  },
  {
    name: "Product currently being prepared",
    color: "#004d00",
  },
  {
    name: "Product en route to Customer",
    color: "#004d00",
  },
];

export const BSC_STATUS: Array<{
  name: string;
  color: string;
}> = [
  {
    name: "",
    color: "",
  },
  {
    name: "New",
    color: "#cca300",
  },
  {
    name: "Verified",
    color: "#004d00",
  },
  {
    name: "Rejected",
    color: "#a21013",
  },
];

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Radio" {
  interface RadioPropsColorOverrides {
    tertiary: true;
  }
}

// Update the Button's color prop options
declare module "@mui/material/Checkbox" {
  interface CheckboxPropsColorOverrides {
    tertiary: true;
  }
}

// Update the Button's color prop options
declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    tertiary: true;
  }
}

// Update the Button's color prop options
declare module "@mui/material/Tabs" {
  interface TabsPropsColorOverrides {
    tertiary: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#a21013",
    },
    secondary: {
      main: "#22201A",
    },
    tertiary: {
      main: "#ffcd17",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#22201A",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#22201A",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#22201A",
          },
          "& label": {
            color: "#22201A !important",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#22201A",
        },
        root: {
          "& .MuiTab-root.Mui-selected": {
            color: "#22201A",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#22201A",
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: "white !important",
          "&:hover": {
            color: "white !important",
          },
          "&$active": {
            color: "white !important",
          },
          "& .MuiSvgIcon-root": {
            color: "white !important",
          },
        },
      },
    },
  },
});

export const BRANCHES_INFO: Array<{
  icon: ReactElement;
  title: string;
  subtitle: string;
  link: string;
}> = [
  {
    icon: (
      <svg
        className="w-8 h-8 stroke-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
      </svg>
    ),
    title: "Head Office Address",
    subtitle:
      "TEI Center, 3536 Hilario Street, Brgy. Palanan Makati City, 1235 PH",
    link: "https://www.google.com/maps/place/TEI+Center/@14.558713,120.9935478,15z/data=!4m12!1m6!3m5!1s0x3397c9710636ea31:0xf042ad0583cb4d42!2sTEI+Center!8m2!3d14.5587046!4d121.0022656!3m4!1s0x3397c9710636ea31:0xf042ad0583cb4d42!8m2!3d14.5587046!4d121.0022656",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 stroke-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
    title: "Working Hours",
    subtitle: "Mon - Fri: 9AM - 6PM",
    link: "/one",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 stroke-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        ></path>
      </svg>
    ),
    title: "Phone Numbers",
    subtitle: "Hotline: (+63) 997-275-5595",
    link: "tel:09972755595",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 stroke-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        ></path>
      </svg>
    ),
    title: "Email Address",
    subtitle: "contact: tei.csr@tatersgroup.com",
    link: "mailto:tei.csr@tatersgroup.com",
  },
];

export const PROFILE_MENU: Array<{
  name: string;
  icon: ReactNode;
  urlId: string;
}> = [
  {
    name: "Inbox",
    icon: <FaEnvelope />,
    urlId: "inbox",
  },
  {
    name: "Snack Shop Orders",
    icon: <FaShoppingBag />,
    urlId: "snackshop-orders",
  },
  {
    name: "Catering Bookings",
    icon: <RiShoppingBag3Fill />,
    urlId: "catering-bookings",
  },
  {
    name: "Popclub Redeems",
    icon: <GiPopcorn />,
    urlId: "popclub-redeems",
  },
  {
    name: "User Discount",
    icon: <HiDocumentText />,
    urlId: "user-discount",
  },
  {
    name: "Influencer",
    icon: <BsFillPersonBadgeFill />,
    urlId: "influencer",
  },
];

export const SHOP_ORDER_STATUS: Array<{
  name: string;
  color: string;
}> = [
  {
    name: "Incomplete Transaction",
    color: "#a21013",
  },
  {
    name: "Order Placed In System",
    color: "#004d00",
  },
  {
    name: "Payment under Verification",
    color: "#cca300",
  },
  {
    name: "Payment Confirmed",
    color: "#004d00",
  },
  {
    name: "Order Declined",
    color: "#a21013",
  },
  {
    name: "Order Cancelled",
    color: "#a21013",
  },
  {
    name: "Product Received by Customer",
    color: "#004d00",
  },
  {
    name: "Order Rejected due to Incorrect/Incomplete Payment",
    color: "#a21013",
  },
  {
    name: "Product currently being prepared",
    color: "#004d00",
  },
  {
    name: "Product en route to Customer",
    color: "#004d00",
  },
];
