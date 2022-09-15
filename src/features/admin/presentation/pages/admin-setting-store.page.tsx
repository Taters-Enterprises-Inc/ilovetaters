import { AdminSettingStoreTable } from "../tables/admin-setting-store-table";

export function AdminSettingStore() {
  return (
    <>
      <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5">Orders</h1>
      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminSettingStoreTable />
      </div>
    </>
  );
}
