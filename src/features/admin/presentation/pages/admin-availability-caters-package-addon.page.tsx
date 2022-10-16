import { AdminAvailabilityCatersPackageAddons, AdminHead } from "../components";

export function AdminAvailabilityCatersPackageAddon() {
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
            { name: "Availabilities", url: "/admin/availabilities" },
          ],
        }}
      />

      <AdminAvailabilityCatersPackageAddons />
    </>
  );
}
