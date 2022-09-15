import { Link } from "react-router-dom";

export interface AdminOrderModalTabsProps {
  activeTab: "customerInfo" | "orderDetails" | "auditLogs" | "remarks";
}

const TABS = [
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

export function AdminOrderModalTabs(props: AdminOrderModalTabsProps) {
  return (
    <ul className="py-2 overflow-hidden text-white lg:flex lg:py-0">
      {TABS.map((tab, i) => (
        <li
          key={i}
          className="flex items-end justify-end"
          style={{ borderTopLeftRadius: "0.4375rem" }}
        >
          <Link
            to={`/admin/order/${tab.url}`}
            className={`${
              props.activeTab === tab.active
                ? "profile-tab-active lg:shadow-[0_3px_10px_rgb(0,0,0,0.5)] text-tertiary lg:text-white"
                : ""
            } flex w-full font-semibold active space-x-2 items-center text-base text-start py-2 lg:py-4 lg:px-6 bg-primary`}
          >
            {tab.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
