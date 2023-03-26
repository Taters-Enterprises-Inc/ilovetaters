import { AdminHead, AdminInfluencerPromos } from "../components";

export function AdminInfluencerPromo() {
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
              url: "/admin/influencer/promo",
            },
          ],
        }}
      />
      <AdminInfluencerPromos />
    </>
  );
}
