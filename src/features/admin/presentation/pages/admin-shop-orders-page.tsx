import { Head } from "../components/head";
import { AdminOrders } from "../tables/admin-orders-table";

export function AdminShopOrders() {
  return (
    <>
      <Head />

      <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
        Orders
      </h1>

      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminOrders />
      </div>
    </>
  );
}
