import { AdminAvailabilityCatersProductAddons, AdminHead } from "../components";

export function AdminAvailabilityCatersProductAddon() {
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
            { name: "Catering" },
            {
              name: "Product Add-ons",
              url: "/admin/availability/catering/product-addon",
            },
          ],
        }}
      />

      <AdminAvailabilityCatersProductAddons />
    </>
  );
}
