import { useNavigate } from "react-router-dom";
import { SalesFormContent, SalesHead } from "../components";

export function SalesForm() {
  return (
    <>
      <SalesHead
        SalesBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/sales/form",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Form", url: "/admin/sales/form" }],
        }}
      />

      <div className="p-8">
        <div className="flex flex-col space-y-5">
          <div>
            <span className="text-secondary text-4xl font-['Bebas_Neue'] flex-1">
              Form
            </span>
          </div>
          <SalesFormContent />
        </div>
      </div>
    </>
  );
}
