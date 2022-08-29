import { SNACKSHOP_TERMS_AND_CONDITIONS_TABS } from "features/shared/constants";
import { Tab } from "features/shared/presentation/components";

export function ShopTermsAndConditions() {
  return (
    <section className="container py-6">
      <Tab
        tabs={SNACKSHOP_TERMS_AND_CONDITIONS_TABS}
        activeTab="terms-and-conditions"
      ></Tab>
    </section>
  );
}
