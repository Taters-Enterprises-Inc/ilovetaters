import { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface TabModel {
  name: string;
  url: string;
  active: string;
  icon?: ReactNode;
}

interface TabProps {
  activeTab: string;
  children?: ReactNode;
  tabs: Array<TabModel>;
}

export function Tab(props: TabProps) {
  return (
    <div className="flex flex-col items-start justify-start">
      <ul className="py-2 overflow-hidden text-white lg:flex lg:py-0 lg:shadow-[0_3px_10px_rgb(0,0,0,0.5)]">
        {props.tabs.map((tab, i) => (
          <li
            key={i}
            className="flex items-end justify-end"
            style={{ borderTopLeftRadius: "0.4375rem" }}
          >
            <Link
              to={tab.url}
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

      <div className="bg-primary profile-tab-content py-6 lg:shadow-[0_3px_10px_rgba(0,0,0,0.5)] w-full mb-10 lg:p-6 space-y-6">
        {props.children}
      </div>
    </div>
  );
}
