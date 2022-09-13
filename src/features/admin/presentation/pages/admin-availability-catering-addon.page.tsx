import { Head } from "../components/head";
import { AdminAvailabilityCateringAddOnTable } from "../tables/admin-availability-catering-addon-table";

export function AdminAvailabilityCateringAddOn() {
  return (
    <>
      <Head />
      <div className="relative flex">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
          Catering Add-on Availability
        </h1>
      </div>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminAvailabilityCateringAddOnTable />
      </div>
    </>
  );
}
