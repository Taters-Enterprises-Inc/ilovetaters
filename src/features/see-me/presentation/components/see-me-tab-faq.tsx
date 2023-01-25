import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface TabModel {
  name: string;
  url: string;
  active: string;
}

interface SeeMeTabFaqProps {
  activeTab: string;
  children?: ReactNode;
  tabs: Array<TabModel>;
}

export function SeeMeTabFaq(props: SeeMeTabFaqProps) {
  return (
    <>
      <div className="overflow-auto ">
        <ul className="flex pb-2 space-x-8 w-[600px]  text-white lg:pb-0">
          {props.tabs.map((tab, i) => (
            <li
              key={i}
              className="flex items-end justify-end "
              style={{ borderTopLeftRadius: "0.4375rem" }}
            >
              <Link
                to={tab.url}
                className={`${
                  props.activeTab === tab.active
                    ? "profile-tab-active lg:bg-secondary bg-primary text-tertiary "
                    : "text-white bg-primary"
                } flex w-full font-semibold active space-x-2 items-center  rounded-t-md text-xl text-start py-2 lg:py-4 lg:px-4 bg-paper`}
              >
                <span>{tab.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full mb-10 md:rounded-tr-md md:border-0 profile-tab-content ">
        {props.children}
      </div>
    </>
  );
}
