import { AdminHead, AdminSettingDeals } from "../components";

export function AdminSettingDeal() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Deals", url: "/admin/setting/deals" }],
        }}
      />

      <AdminSettingDeals />
    </>
  );
}
