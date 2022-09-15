import { ADMIN_ORDER_MODAL_TABS } from "features/shared/constants";
import { Tab } from "features/shared/presentation/components";
import { ReactNode } from "react";
import { AdminOrderModalTabsProps } from "./admin-order-modal-tabs";

export function AdminOrderModalContainer(props: AdminOrderModalTabsProps) {
  return (
    <main className="bg-paper">
      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-8">
          <div className="container">
            <Tab tabs={ADMIN_ORDER_MODAL_TABS} activeTab={props.activeTab}>
              <div className="space-y-6"></div>
            </Tab>
          </div>
        </div>
      </section>
    </main>
  );
}
