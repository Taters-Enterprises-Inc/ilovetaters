import { AdminAvailabilityProductTable } from "../tables/admin-availability-product-table";

export function AdminAvailabilityProduct() {
  return (
    <>
      <div className="relative flex">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
          Product Availability
        </h1>
      </div>

      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminAvailabilityProductTable />
      </div>
    </>
  );
}
