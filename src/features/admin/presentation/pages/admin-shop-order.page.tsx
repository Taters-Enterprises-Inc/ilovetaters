import { AdminOrderTable } from "../tables/admin-order-table";

export function AdminShopOrder() {
  return (
    <>
      <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
        Orders
      </h1>

      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminOrderTable />
      </div>
    </>
  );
}
