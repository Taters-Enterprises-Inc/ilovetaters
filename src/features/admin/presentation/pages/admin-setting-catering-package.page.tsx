import { AdminHead, AdminSettingCateringPackages } from "../components";

export function AdminSettingCateringPackage() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Packages", url: "/admin/setting/package" }],
        }}
      />
      <AdminSettingCateringPackages />
    </>
  );
}
