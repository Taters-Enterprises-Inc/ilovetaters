import { SNACKSHOP_PROFILE_TABS } from "features/shared/constants";
import { Tab } from "features/shared/presentation/components";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { ReactNode, useEffect, useState } from "react";
import { ShopProfileTabsProps } from "../../../shop/presentation/components/shop-profile-tabs";
import { useAppSelector } from "features/config/hooks";
import { selectGetUnreadNotifications } from "features/shared/presentation/slices/unread-notification.slice";
import { RiNotificationBadgeFill } from "react-icons/ri";

interface ProfileContainerProps extends ShopProfileTabsProps {
  title: string;
  children: ReactNode;
}

export function ProfileContainer(props: ProfileContainerProps) {
  const getUnreadNotification = useAppSelector(selectGetUnreadNotifications);
  const [notificationBadge, setNotificationBadge] = useState("");

  useEffect(() => {
    if (getUnreadNotification.data) {
      if (getUnreadNotification.data.Snackshop === 0) {
        setNotificationBadge("catering");
      } else if (getUnreadNotification.data.Catering === 0) {
        setNotificationBadge("snackshop");
      } else {
        setNotificationBadge("both");
      }
    }
  }, [notificationBadge, getUnreadNotification]);

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
