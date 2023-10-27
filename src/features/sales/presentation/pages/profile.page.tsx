import { useNavigate } from "react-router-dom";
import { SalesHead } from "../components";

export function SalesProfile() {
  return (
    <>
      <SalesHead
        SalesBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/sales/profile",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Dashboard", url: "/admin/sales/profile" }],
        }}
      />
    </>
  );
}
