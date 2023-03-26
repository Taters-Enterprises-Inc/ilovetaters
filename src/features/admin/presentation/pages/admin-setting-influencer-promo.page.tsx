import { AdminHead, AdminSettingInfluencerPromos } from "../components";

export function AdminSettingInfluencerPromo() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            {
              name: "Influencer Promos",
              url: "/admin/setting/influencer-promo",
            },
          ],
        }}
      />
      <AdminSettingInfluencerPromos />
    </>
  );
}
