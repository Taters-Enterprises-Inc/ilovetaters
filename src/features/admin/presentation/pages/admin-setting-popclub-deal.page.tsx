import { AdminHead, AdminSettingPopclubDeals } from "../components";

export function AdminSettingPopClubDeal() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Deals", url: "/admin/setting/deal" }],
        }}
      />
      <AdminSettingPopclubDeals />
    </>
  );
}
