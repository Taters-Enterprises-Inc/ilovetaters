import { useNavigate } from "react-router-dom";
import { StockOrderHead } from "../components";

export function StockOrderDashboard() {
  return (
    <>
      <StockOrderHead
        StockOrderBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/stock-order/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Dashboard", url: "/stock-order/dashboard" }],
        }}
      />
    </>
  );
}
