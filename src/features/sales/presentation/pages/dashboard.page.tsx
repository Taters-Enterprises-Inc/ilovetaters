import { useNavigate } from "react-router-dom";
import { SalesDashboardContent, SalesHead } from "../components";

export function SalesDashboard() {
  return (
    <>
      <SalesHead
        SalesBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/sales/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Dashboard", url: "/admin/sales/dashboard" }],
        }}
      />
      <div className="p-8">
        <div className="flex flex-col space-y-5">
          <div>
            <span className="text-secondary text-4xl font-['Bebas_Neue'] flex-1">
              Dashboard
            </span>
          </div>
          <SalesDashboardContent />
        </div>
      </div>
    </>
  );
}
