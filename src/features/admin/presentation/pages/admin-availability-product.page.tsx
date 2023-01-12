import { AdminAvailabilityProducts, AdminHead } from "../components";

export function AdminAvailabilityProduct() {
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
            { name: "Availabilities" },
            { name: "Shop" },
            {
              name: "Product",
              url: "/admin/availability/shop/product",
            },
          ],
        }}
      />

      <AdminAvailabilityProducts />
    </>
  );
}
