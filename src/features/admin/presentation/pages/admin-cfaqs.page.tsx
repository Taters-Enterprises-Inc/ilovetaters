import { ADMIN_FAQ } from "features/shared/constants";
import { TabFaq } from "../components/tabfaq";
import CustomizedAccordionsCFAQ from "../components/faq-customers";
import { AdminHead } from "../components";

export function AdminCFaq() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "FAQS", url: "/admin/faq/customer" }],
        }}
      />
      {/* change page info here */}
      <div className="relative block h-screen">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary max-h-screen">
          Frequently Asked Questions
        </h1>
        <main className="">
          <section className="px-4 pt-6">
            <TabFaq tabs={ADMIN_FAQ} activeTab="customer">
              <CustomizedAccordionsCFAQ></CustomizedAccordionsCFAQ>
            </TabFaq>
          </section>
        </main>
      </div>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4"></div>
    </>
  );
}
