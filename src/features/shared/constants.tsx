import createTheme from "@mui/material/styles/createTheme";
import { FaShoppingBag, FaUserAlt, FaStoreAlt } from "react-icons/fa";
import { MdPolicy, MdRule } from "react-icons/md";
import { RiShoppingBag3Fill, RiUserHeartLine } from "react-icons/ri";
import { GoLaw } from "react-icons/go";
import { TabModel } from "./presentation/components/tab";
import { GiPopcorn } from "react-icons/gi";

export const REACT_APP_DOMAIN_URL = process.env.REACT_APP_DOMAIN_URL;
export const REACT_APP_BASE_NAME = process.env.REACT_APP_BASE_NAME;

// PUSHER
export const REACT_APP_PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY ?? "";
export const REACT_APP_PUSHER_CLUSTER =
  process.env.REACT_APP_PUSHER_CLUSTER ?? "";

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

export const TABS: Array<{ name: string; url: string }> = [
  {
    name: "POPCLUB",
    url: "/popclub",
  },
  {
    name: "SNACKSHOP",
    url: "/delivery",
  },
  {
    name: "CATERING",
    url: "/shop",
  },
  {
    name: "FRANCHISING",
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

export const SNACKSHOP_PROFILE_TABS: Array<TabModel> = [
  {
    name: "My Profile",
    active: "profile",
    icon: <FaUserAlt />,
    url: "/profile",
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#22201A",
          },
          "&:hover fieldset": {
            borderColor: "#22201A",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#22201A",
          },
          ".Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#22201A",
          },
          // "&.Mui-focused fieldset": {
          //   borderColor: "blue !important",
          // },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#22201A",
          "-webkit-text-fill-color": "#22201A !important",
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
    MuiSelect: {
      styleOverrides: {
        iconOutlined: {
          color: "#22201A",
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
    MuiTextField: {
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
  },
});

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
    color: "#004d00",
  },
  {
    name: "Upload Signed Contract",
    color: "#004d00",
  },
  {
    name: "Contract under verification",
    color: "#004d00",
  },
  {
    name: "Upload Initial proof of payment",
    color: "#004d00",
  },
  {
    name: "Initial proof of payment under verification",
    color: "#004d00",
  },
  {
    name: "Upload Final proof of payment",
    color: "#004d00",
  },
  {
    name: "Final proof of payment under verification",
    color: "#004d00",
  },
  {
    name: "Payment Verified",
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
    color: "#004d00",
  },
  {
    name: "Booking Confirmed",
    color: "#004d00",
  },
  {
    name: "Contract Uploaded",
    color: "#004d00",
  },
  {
    name: "Contract Verified",
    color: "#004d00",
  },
  {
    name: "Initial Payment Uploaded",
    color: "#004d00",
  },
  {
    name: "Initial Payment Verified",
    color: "#004d00",
  },
  {
    name: "Final Payment Uploaded",
    color: "#004d00",
  },
  {
    name: "Final payment verified",
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
