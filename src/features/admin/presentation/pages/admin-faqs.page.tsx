import { ADMIN_FAQ } from "features/shared/constants";
import { TabFaq } from "../components/tabfaq";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomizedAccordionsSFAQ from "../components/faq-store";
import { AdminHead } from "../components";

export function AdminFaq() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "FAQS", url: "/admin/faq/store" }],
        }}
      />
      {/* change page info here */}
      <div className="relative block h-screen">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-1 text-secondary max-h-screen">
          Frequently Asked Questions
        </h1>
        <main className="">
          <section className="px-4 lg:mt-6 ">
            <TabFaq tabs={ADMIN_FAQ} activeTab="store">
              <CustomizedAccordionsSFAQ />
            </TabFaq>
          </section>
        </main>
      </div>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4"></div>
    </>
  );
}
