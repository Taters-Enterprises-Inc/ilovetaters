import { AdminAvailabilityCatersProducts, AdminHead } from "../components";

export function AdminAvailabilityCatersProduct() {
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
              name: "Build Your Own Package",
              url: "/admin/availability/catering/build-your-own-package",
            },
          ],
        }}
      />

      <AdminAvailabilityCatersProducts />
    </>
  );
}
