import { Head } from "../components/head";
import { AdminSettingUserTable } from "../tables/admin-setting-user-table";

export function AdminSettingUser() {
  return (
    <>
      <Head />
      <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
        Users
      </h1>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminSettingUserTable />
      </div>
    </>
  );
}
