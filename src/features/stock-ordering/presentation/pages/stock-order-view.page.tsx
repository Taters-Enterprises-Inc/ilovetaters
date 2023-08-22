import { useNavigate } from "react-router-dom";
import { StockOrderHead, StockOrderViewContent } from "../components";

export function StockOrderView() {
  return (
    <>
      <StockOrderHead
        StockOrderBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/stock-order/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Order", url: "/stock-order/order" },
            { name: "View", url: "/stock-order/order/view" },
          ],
        }}
      />

      <StockOrderViewContent />
    </>
  );
}
