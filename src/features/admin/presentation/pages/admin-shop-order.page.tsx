import { AdminHead, AdminShopOrders } from "../components";

export function AdminShopOrder() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Orders", url: "/admin/order" }],
        }}
      />

      <AdminShopOrders />
    </>
  );
}
