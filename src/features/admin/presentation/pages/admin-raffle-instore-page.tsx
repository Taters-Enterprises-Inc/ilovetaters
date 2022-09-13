import { Head } from "../components/head";
import { AdminRaffleInstoreTable } from "../tables/admin-raffle-instore-table";

export function AdminRaffleInstore() {
  return (
    <>
      <Head />

      <div className="relative flex">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5">In-store</h1>
      </div>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminRaffleInstoreTable />
      </div>
    </>
  );
}
