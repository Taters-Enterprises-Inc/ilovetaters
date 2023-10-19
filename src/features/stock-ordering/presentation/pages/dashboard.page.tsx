import { useNavigate } from "react-router-dom";
import { StockOrderHead } from "../components";
import { DashboardContents } from "../components/dashboard-contents";

export function StockOrderDashboard() {
  return (
    <>
      <StockOrderHead
        StockOrderBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/stock-order/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Dashboard", url: "/admin/stock-order/dashboard" },
          ],
        }}
      />

      <div className="p-8">
        <DashboardContents />
      </div>
    </>
  );
}
