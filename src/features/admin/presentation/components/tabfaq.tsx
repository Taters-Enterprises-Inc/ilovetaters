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

export function TabFaq(props: TabProps) {
  return (
    <div className="flex flex-col items-start justify-start">
      <ul className="py-2 overflow-hidden text-white lg:flex lg:py-0 ">
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
                  ? "profile-tab-active bg-secondary  text-primary lg:text-white"
                  : "text-secondary"
              } flex w-full font-semibold active space-x-2 items-center text-base text-start py-2 lg:py-4 lg:px-6 bg-paper`}
            >
              {tab.icon} <span>{tab.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="w-full py-6 mb-10 border-2 bg-paper profile-tab-content lg:p-6 border-secondary ">
        {props.children}
      </div>
    </div>
  );
}

// border-x-2 border-secondary
