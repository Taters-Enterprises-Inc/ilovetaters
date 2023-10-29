import { useNavigate } from "react-router-dom";
import { SalesHead } from "../components";

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
    </>
  );
}
