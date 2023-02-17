import { AdminHead, AdminSettingShopProducts } from "../components";

export function AdminSettingShopProduct() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Products", url: "/admin/setting/product" }],
        }}
      />
      <AdminSettingShopProducts />
    </>
  );
}
