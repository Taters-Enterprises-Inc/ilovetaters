import { AdminCateringOrderTable } from "../tables/admin-catering-order-table";

export function AdminCateringOrder() {
  return (
    <>
      <div className="relative flex">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
          Catering Orders
        </h1>
      </div>

      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminCateringOrderTable />
      </div>
    </>
  );
}
