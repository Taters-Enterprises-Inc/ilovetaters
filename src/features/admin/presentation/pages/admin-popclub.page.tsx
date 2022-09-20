import { AdminHead, AdminPopClubRedeems } from "../components";

export function AdminPopclub() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Popclub", url: "/admin/popclub" }],
        }}
      />

      <AdminPopClubRedeems />
    </>
  );
}
