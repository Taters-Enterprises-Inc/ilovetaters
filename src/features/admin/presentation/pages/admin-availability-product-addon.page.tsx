import { Head } from "../components/head";
import { AdminAvailabilityProductAddOnTable } from "../tables/admin-availability-product-addon-table";

export function AdminAvailabilityProductAddOn() {
  return (
    <>
      <Head />

      <div className="relative flex">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
          Product Add-on Availability
        </h1>
      </div>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminAvailabilityProductAddOnTable />
      </div>
    </>
  );
}
