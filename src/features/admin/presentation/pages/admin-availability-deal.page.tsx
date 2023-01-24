import { AdminAvailabilityDeals, AdminHead } from "../components";

export function AdminAvailabilityDeal() {
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
            { name: "Pop Club" },
            {
              name: "Deals",
              url: "/admin/availability/popclub/deal",
            },
          ],
        }}
      />

      <AdminAvailabilityDeals />
    </>
  );
}
