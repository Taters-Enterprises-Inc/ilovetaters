import { PROFILE_TABS } from "features/shared/constants";
import { Tab } from "features/shared/presentation/components";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { ReactNode } from "react";

interface ProfileContainerProps {
  title: string;
  children: ReactNode;
  activeTab:
    | "profile"
    | "snackshop"
    | "catering"
    | "popclub"
    | "raffle"
    | "gift-cards"
    | "user-discount"
    | "influencer"
    | "inbox";
}

export function ProfileContainer(props: ProfileContainerProps) {
  return (
    <main className="bg-paper">
      <PageTitleAndBreadCrumbs className="lg:h-[200px]" title={props.title} />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-8">
          <div className="container">
            <Tab tabs={PROFILE_TABS} activeTab={props.activeTab}>
              <div className="space-y-6">{props.children}</div>
            </Tab>
          </div>
        </div>
      </section>
    </main>
  );
}
