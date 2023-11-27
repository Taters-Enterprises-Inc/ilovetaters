import { useNavigate } from "react-router-dom";
import { SalesHead } from "../components";

export function SalesHistory() {
  return (
    <>
      <SalesHead
        SalesBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/sales/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "History", url: "/admin/sales/history" }],
        }}
      />
    </>
  );
}
