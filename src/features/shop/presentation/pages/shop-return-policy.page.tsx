import { SNACKSHOP_TERMS_AND_CONDITIONS_TABS } from "features/shared/constants";
import { Tab } from "features/shared/presentation/components";

export function ShopReturnPolicy() {
  return (
    <section className="container py-6">
      <Tab
        tabs={SNACKSHOP_TERMS_AND_CONDITIONS_TABS}
        activeTab="return-policy"
        badge={null}
      >
        <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl">
          Return Policy
        </h1>
        <hr className="mt-2 mb-4 border-secondary" />
        <div className="space-y-4 text-secondary">
          <p>
            Strictly no refund, change, or cancellation once the order has been
            confirmed.
          </p>
          <p>
            If due to unforeseen circumstances comitted by the store and
            customer requests for a refund, a full refund will be requested by
            Taters and will be processed by PayMaya (Third-Party Payment Portal)
            to his/her respective bank and a cancellation form will be given to
            the customer as a proof of order cancellation.
          </p>
          <p>
            Customers can return a product if the store mistakenly delivers a
            wrong order. Proof of order should be presented/sent to Taters
            official accounts. Request for product change is only valid 24 hours
            after purchasing.
          </p>
          <p className="mt-0">
            <strong>
              For any inquiry regarding this return policy, please contact us
              at:
            </strong>
          </p>
          <p className="mt-0">Taters Snack Shop</p>
          <p className="mt-0">
            Contact No: (+63) 949-889-9558 from Monday to Friday (9:30AM to
            7:30PM)
          </p>{" "}
        </div>
      </Tab>
    </section>
  );
}
