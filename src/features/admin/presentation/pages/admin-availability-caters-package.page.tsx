import { AdminAvailabilityCatersPackages, AdminHead } from "../components";

export function AdminAvailabilityCatersPackage() {
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
              name: "Package",
              url: "/admin/availability/catering/package",
            },
          ],
        }}
      />

      <AdminAvailabilityCatersPackages />
    </>
  );
}
