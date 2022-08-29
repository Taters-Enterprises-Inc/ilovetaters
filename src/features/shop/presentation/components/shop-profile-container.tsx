import { SNACKSHOP_PROFILE_TABS } from "features/shared/constants";
import { Tab } from "features/shared/presentation/components";
import { ReactNode } from "react";
import { ShopPageTitleAndBreadCrumbs } from "../components/shop-page-title-and-breadcrumbs";
import {
  ShopProfileTabs,
  ShopProfileTabsProps,
} from "../components/shop-profile-tabs";

interface ShopProfileContainerProps extends ShopProfileTabsProps {
  title: string;
  children: ReactNode;
}

export function ShopProfileContainer(props: ShopProfileContainerProps) {
  return (
    <>
      <ShopPageTitleAndBreadCrumbs
        title={props.title}
        pageTitles={["Products", props.title]}
      />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-8">
          <div className="container">
            <Tab tabs={SNACKSHOP_PROFILE_TABS} activeTab={props.activeTab}>
              <div className="space-y-6">{props.children}</div>
            </Tab>
          </div>
        </div>
      </section>
    </>
  );
}
