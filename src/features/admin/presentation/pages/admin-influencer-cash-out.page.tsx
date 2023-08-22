import { AdminHead, AdminInfluencerCashouts } from "../components";

export function AdminInfluencerCashout() {
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
              name: "Influencer Cashouts",
              url: "/admin/influencer/cashout",
            },
          ],
        }}
      />
      <AdminInfluencerCashouts />
    </>
  );
}
