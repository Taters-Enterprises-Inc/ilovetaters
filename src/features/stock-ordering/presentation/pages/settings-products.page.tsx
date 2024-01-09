import { StockOrderHead } from "../components";
import { StockOrderSettingsProductContents } from "../components/stock-order-settings-product-content";

export function StockOrderingSettingsProductsPage() {
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
            { name: "Settings", url: "/admin/stock-order/settings/products" },
            {
              name: "All Products",
              url: "/admin/stock-order/settings/products",
            },
          ],
        }}
      />
      <div className="p-8">
        <StockOrderSettingsProductContents />
      </div>
    </>
  );
}
