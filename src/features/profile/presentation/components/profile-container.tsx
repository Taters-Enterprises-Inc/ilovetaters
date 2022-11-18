import { SNACKSHOP_PROFILE_TABS } from "features/shared/constants";
import { Tab } from "features/shared/presentation/components";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { ReactNode, useEffect, useState } from "react";
import { ShopProfileTabsProps } from "../../../shop/presentation/components/shop-profile-tabs";
import { useAppSelector } from "features/config/hooks";
import { selectGetNotifications } from "features/shared/presentation/slices/get-notifications.slice";

interface ProfileContainerProps extends ShopProfileTabsProps {
  title: string;
  children: ReactNode;
}

export function ProfileContainer(props: ProfileContainerProps) {
  const getNotificationsState = useAppSelector(selectGetNotifications);
  const [notificationBadge, setNotificationBadge] = useState("");

  useEffect(() => {
    if (getNotificationsState.data) {
      if (
        getNotificationsState.data.snackshop.count === 0 &&
        getNotificationsState.data.catering.count !== 0
      ) {
        setNotificationBadge("catering");
      } else if (
        getNotificationsState.data.snackshop.count !== 0 &&
        getNotificationsState.data.catering.count === 0
      ) {
        setNotificationBadge("snackshop");
      } else if (
        getNotificationsState.data.snackshop.count !== 0 &&
        getNotificationsState.data.catering.count !== 0
      ) {
        setNotificationBadge("both");
      } else {
        setNotificationBadge("");
      }
    }
  }, [notificationBadge, getNotificationsState]);

  return (
    <main className="bg-paper">
      <PageTitleAndBreadCrumbs className="lg:h-[200px]" title={props.title} />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-8">
          <div className="container">
            <Tab
              tabs={SNACKSHOP_PROFILE_TABS}
              activeTab={props.activeTab}
              badge={notificationBadge}
            >
              <div className="space-y-6">{props.children}</div>
            </Tab>
          </div>
        </div>
      </section>
    </main>
  );
}
