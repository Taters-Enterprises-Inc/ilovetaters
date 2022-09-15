import { AdminAvailabilityBannerTable } from "../tables/admin-availability-banner-table";

export function AdminAvailabilityBanner() {
  return (
    <>
      <div className="relative flex">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
          Banner Availability
        </h1>
      </div>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminAvailabilityBannerTable />
      </div>
    </>
  );
}
