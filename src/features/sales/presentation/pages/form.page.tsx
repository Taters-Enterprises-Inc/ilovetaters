import { useNavigate } from "react-router-dom";
import { SalesHead } from "../components";
import { SalesFormContent } from "../components/form-contents";

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
          pageTitles: [{ name: "Dashboard", url: "/admin/sales/form" }],
        }}
      />

        <div className="p-8">
            <SalesFormContent />
        </div>
      
    </>
  );
}
