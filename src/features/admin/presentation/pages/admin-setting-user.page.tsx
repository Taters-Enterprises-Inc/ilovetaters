import { AdminHead, AdminSettingUsers } from "../components";

export function AdminSettingUser() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "User", url: "/admin/setting/user" }],
        }}
      />

      <AdminSettingUsers />
    </>
  );
}
