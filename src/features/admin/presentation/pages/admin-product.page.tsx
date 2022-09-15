import { Head } from "../components/head";
import { AdminProductTable } from "../tables/admin-product-table";

export function AdminProduct() {
  return (
    <>
      <Head />

      <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
        Products
      </h1>

      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminProductTable />
      </div>
    </>
  );
}
