import { AdminHead } from "../components";

export function AdminSettingShopEditProduct() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Products", url: "/admin/setting/product" },
            {
              name: "Edit Product",
              url: "/admin/setting/product/edit-product",
            },
          ],
        }}
      />
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit Product
        </span>
      </div>
    </>
  );
}
