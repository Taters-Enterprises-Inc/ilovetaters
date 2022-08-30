import createTheme from "@mui/material/styles/createTheme";
import { FaShoppingBag, FaUserAlt } from "react-icons/fa";
import { MdPolicy, MdRule } from "react-icons/md";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { GoLaw } from "react-icons/go";
import { TabModel } from "./presentation/components/tab";

export const REACT_APP_DOMAIN_URL = process.env.REACT_APP_DOMAIN_URL;
export const REACT_APP_BASE_NAME = process.env.REACT_APP_BASE_NAME;

export const SERVICES_DESKTOP = [
  {
    title: "Snackshop",
    subtitle: "Online delivery snacks",
    color: "#1d1115",
    textColor: "white",
    url: "shop",
    image: "api/assets/images/home/cards/taters_snackshop.webp",
  },
  {
    title: "Franchising",
    subtitle: "Investment opportunities",
    color: "#1b1915",
    textColor: "white",
    url: "franchising",
    image: "api/assets/images/home/cards/taters_franchising.webp",
  },
  {
    title: "PopClub",
    subtitle: "Best deals in town",
    color: "#22201A",
    textColor: "white",
    url: "popclub",
    image: "api/assets/images/home/cards/taters_popclub.webp",
  },
  {
    title: "Taters Caters",
    subtitle: "Celebration Snacks",
    color: "#858173",
    textColor: "black",
    url: "catering",
    image: "api/assets/images/home/cards/taters_catering.webp",
  },
  {
    title: "Reseller",
    subtitle: "Community selling",
    color: "#c7b7ad",
    textColor: "black",
    url: "reseller",
    image: "api/assets/images/home/cards/taters_reseller.webp",
  },
  {
    title: "Branches",
    subtitle: "Nationwide Locations",
    color: "#d7cdb7",
    textColor: "black",
    url: "branches",
    image: "api/assets/images/home/cards/taters_branches.webp",
  },
];

export const SERVICES_MOBILE = [
  {
    title: "Snackshop",
    subtitle: "Online delivery snacks",
    color: "#1d1115",
    textColor: "white",
    url: "shop",
    image: "api/assets/images/home/cards/taters_snackshop.webp",
  },
  {
    title: "Taters Caters",
    subtitle: "Celebration Snacks",
    color: "#858173",
    textColor: "black",
    url: "catering",
    image: "api/assets/images/home/cards/taters_catering.webp",
  },
  {
    title: "Franchising",
    subtitle: "Investment opportunities",
    color: "#1b1915",
    textColor: "white",
    url: "franchising",
    image: "api/assets/images/home/cards/taters_franchising.webp",
  },
  {
    title: "Reseller",
    subtitle: "Community selling",
    color: "#c7b7ad",
    textColor: "black",
    url: "reseller",
    image: "api/assets/images/home/cards/taters_reseller.webp",
  },
  {
    title: "PopClub",
    subtitle: "Best deals in town",
    color: "#22201A",
    textColor: "white",
    url: "popclub",
    image: "api/assets/images/home/cards/taters_popclub.webp",
  },
  {
    title: "Branches",
    subtitle: "Nationwide Locations",
    color: "#d7cdb7",
    textColor: "black",
    url: "branches",
    image: "api/assets/images/home/cards/taters_branches.webp",
  },
];

export const TABS = [
  {
    name: "HOME",
    url: "/",
  },
  {
    name: "POPCLUB",
    url: "/popclub",
  },
  {
    name: "SNACKSHOP",
    url: "/shop",
  },
  {
    name: "CATERING",
    url: "/catering",
  },
  {
    name: "BRANCHES",
    url: "/branches",
  },
];

export const SNACKSHOP_TERMS_AND_CONDITIONS_TABS: Array<TabModel> = [
  {
    name: "Terms And Conditions",
    active: "terms-and-conditions",
    url: "/shop/terms-and-conditions",
    icon: <MdRule />,
  },
  {
    name: "Privacy Policy",
    active: "privacy-policy",
    url: "/shop/privacy-policy",
    icon: <MdPolicy />,
  },
  {
    name: "Return Policy",
    active: "return-policy",
    url: "/shop/return-policy",
    icon: <GoLaw />,
  },
];
export const SNACKSHOP_PROFILE_TABS: Array<TabModel> = [
  {
    name: "My Profile",
    active: "profile",
    icon: <FaUserAlt />,
    url: "/shop/profile",
  },
  {
    name: "Snack Shop Orders",
    active: "snackshop",
    icon: <FaShoppingBag />,
    url: "/shop/profile/snackshop-orders",
  },
  {
    name: "Catering Bookings",
    active: "catering",
    icon: <RiShoppingBag3Fill />,
    url: "/shop/profile/catering-bookings",
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
          color: "white",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "white !important",
          },
          "&:hover fieldset": {
            borderColor: "white !important",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white !important",
          },
        },
        input: {
          color: "white",
          "-webkit-text-fill-color": "white !important",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "white",
          },
          "& label": {
            color: "white !important",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        iconOutlined: {
          color: "white",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "white",
          },
          "& label": {
            color: "white !important",
          },
        },
      },
    },
  },
});
