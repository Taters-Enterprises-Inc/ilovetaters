import { OrderContents } from "features/stock-ordering/presentation/components/order-contents";
import { SalesHead } from "../components";

export function PayablePage() {
  return (
    <>
      <SalesHead
        SalesBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/sales/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "payable", url: "/admin/sales/payable" }],
        }}
      />

      <div className="p-8">
        <OrderContents isPayment={true} />
      </div>
    </>
  );
}
