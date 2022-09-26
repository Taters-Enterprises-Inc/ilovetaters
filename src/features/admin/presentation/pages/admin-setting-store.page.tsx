import { AdminHead, AdminSettingStores } from "../components";
export function AdminSettingStore() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Stores", url: "/admin/setting/stores" }],
        }}
      />
      <AdminSettingStores />
    </>
  );
}
