import { Head } from "../components/head";
import { AdminSettingCategoryTable } from "../tables/admin-category-table";

export function AdminSettingCategory() {
  return (
    <>
      <Head />

      <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5 text-secondary">
        Category
      </h1>

      <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
        <AdminSettingCategoryTable />
      </div>
    </>
  );
}
