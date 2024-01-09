import { useParams } from "react-router-dom";
import {
  StockOrderHead,
  StockOrderSettingsProductEditContent,
} from "../components";

export function StockOrderingSettingsEditProductsPage() {
  const { id } = useParams();

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
            {
              name: "All Products",
              url: "/admin/stock-order/settings/products",
            },
            {
              name: "Edit",
              url: "/admin/stock-order/settings/products/edit/" + id,
            },
            {
              name: id,
              url: "/admin/stock-order/settings/products/edit/" + id,
            },
          ],
        }}
      />
      <div className="p-8">
        <StockOrderSettingsProductEditContent />
      </div>
    </>
  );
}
