import { Head } from "../components/head";
import { AdminSettingVoucherTable } from "../tables/admin-setting-voucher-table";

export function AdminSettingVoucher() {
  return (
    <>
      <Head />

      <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
        Vouchers
      </h1>

      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminSettingVoucherTable />
      </div>
    </>
  );
}
