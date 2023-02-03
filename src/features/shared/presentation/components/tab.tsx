import Tabs from "@mui/material/Tabs";
import { ReactNode, useEffect } from "react";
import { VscCircleFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";
import {
  selectGetNotifications,
  getNotifications,
} from "../slices/get-notifications.slice";
import { useAppSelector } from "features/config/hooks";

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
  const getNotificationsState = useAppSelector(selectGetNotifications);

  return (
    <div className="flex flex-col items-start justify-start">
      <ul className="py-2 overflow-hidden text-white lg:flex lg:py-0 lg:shadow-[0_3px_10px_rgb(0,0,0,0.5)] lg:ml-[0%] ml-[5%]">
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
                  ? "profile-tab-active lg:shadow-[0_3px_10px_rgb(0,0,0,0.5)] text-primary lg:text-secondary"
                  : "text-secondary"
              } flex w-full font-semibold active space-x-2 items-center text-base text-start py-2 lg:py-4 lg:px-6 bg-paper`}
            >
              <div className="relative">
                {tab.icon}

                {tab.active === "snackshop" &&
                getNotificationsState.data &&
                getNotificationsState.data.snackshop_order
                  .unseen_notifications_count > 0 ? (
                  <VscCircleFilled className="absolute top-[-5px] right-[-8px] text-xs text-red-600" />
                ) : null}

                {tab.active === "catering" &&
                getNotificationsState.data &&
                getNotificationsState.data.catering_booking
                  .unseen_notifications_count > 0 ? (
                  <VscCircleFilled className="absolute top-[-5px] right-[-8px] text-xs text-red-600" />
                ) : null}

                {tab.active === "popclub" &&
                getNotificationsState.data &&
                getNotificationsState.data.popclub_redeem
                  .unseen_notifications_count > 0 ? (
                  <VscCircleFilled className="absolute top-[-5px] right-[-8px] text-xs text-red-600" />
                ) : null}

                {tab.active === "inbox" &&
                getNotificationsState.data &&
                getNotificationsState.data.inbox.unseen_notifications_count >
                  0 ? (
                  <VscCircleFilled className="absolute top-[-5px] right-[-8px] text-xs text-red-600" />
                ) : null}
              </div>

              <span>{tab.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="bg-paper profile-tab-content py-6 lg:shadow-[0_3px_10px_rgba(0,0,0,0.5)] w-full mb-10 lg:p-6">
        {props.children}
      </div>
    </div>
  );
}
