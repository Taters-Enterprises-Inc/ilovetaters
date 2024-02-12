import { StockOrderHead } from "../components";
import StockOrderSettingsProductCreateContent from "../components/stock-order-settings-product-create-content";

export function StockOrderingSettingsCreateProductsPage() {
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
              name: "Create New Product",
              url: "/admin/stock-order/settings/products/create",
            },
          ],
        }}
      />
      <div className="p-8">
        <StockOrderSettingsProductCreateContent />
      </div>
    </>
  );
}
