import { useNavigate } from "react-router-dom";
import { SalesHead } from "../components";
import { SalesModal } from "../components/sales-modal";

export function SalesExtra() {
  return (
    <>
      <SalesHead
        SalesBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/sales/extra",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Extra", url: "/admin/sales/extra" }],
        }}
      />

      <div className="p-8">
        <div className="flex flex-col space-y-5">
          <SalesModal />
        </div>
      </div>
    </>
  );
}
