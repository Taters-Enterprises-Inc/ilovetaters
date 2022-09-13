import { Head } from "../components/head";
import { AdminRaffleSnackshopTable } from "../tables/admin-raffle-snackshop-table";

export function AdminRaffleSnackshop() {
  return (
    <>
      <Head />

      <div className="relative flex">
        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5">Snackshop</h1>
      </div>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminRaffleSnackshopTable />
      </div>
    </>
  );
}
