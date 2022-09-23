import { FaShoppingBag, FaUserAlt } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

export interface ShopProfileTabsProps {
  activeTab:
    | "profile"
    | "snackshop"
    | "catering"
    | "popclub"
    | "raffle"
    | "gift-cards";
}

const TABS = [
  {
    name: "My Profile",
    active: "profile",
    icon: <FaUserAlt />,
    url: "",
  },
  {
    name: "Snack Shop Orders",
    active: "snackshop",
    icon: <FaShoppingBag />,
    url: "snackshop-orders",
  },
  {
    name: "Catering Bookings",
    active: "catering",
    icon: <RiShoppingBag3Fill />,
    url: "catering-bookings",
  },
];

export function ShopProfileTabs(props: ShopProfileTabsProps) {
  return (
    <ul className="py-2 overflow-hidden text-white lg:flex lg:py-0">
      {TABS.map((tab, i) => (
        <li
          key={i}
          className="flex items-end justify-end"
          style={{ borderTopLeftRadius: "0.4375rem" }}
        >
          <Link
            to={`/profile/${tab.url}`}
            className={`${
              props.activeTab === tab.active
                ? "profile-tab-active lg:shadow-[0_3px_10px_rgb(0,0,0,0.5)] text-tertiary lg:text-white"
                : ""
            } flex w-full font-semibold active space-x-2 items-center text-base text-start py-2 lg:py-4 lg:px-6 bg-primary`}
          >
            {tab.icon} <span>{tab.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
