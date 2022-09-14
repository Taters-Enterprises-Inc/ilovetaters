import { Head } from "../components/head";
import { AdminAvailabilityPackageTable } from "../tables/admin-availability-package-table";

export function AdminAvailabilityPackage() {
  return (
    <>
      <Head />

      <div className="relative flex">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
          Packages Availability
        </h1>
      </div>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminAvailabilityPackageTable />
      </div>
    </>
  );
}