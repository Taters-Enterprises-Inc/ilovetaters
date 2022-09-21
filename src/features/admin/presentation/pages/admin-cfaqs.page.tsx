import { ADMIN_FAQ } from "features/shared/constants";
import { Tab } from "features/shared/presentation/components";
import CustomizedAccordionsCFAQ from "../components/faq-customers";

export function AdminCFaq() {
  return (
    <>
      {/* change page info here */}
      <div className="relative block h-screen">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary max-h-screen">
          Frequently Asked Questions
        </h1>
        <main className="container block pb-4 min-h-min">
          <section className="container py-6">
            <Tab tabs={ADMIN_FAQ} activeTab="customer">
              <CustomizedAccordionsCFAQ></CustomizedAccordionsCFAQ>
            </Tab>
          </section>
        </main>
      </div>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4"></div>
    </>
  );
}
