import { AdminHead } from "../components";
import { AdminInfluencers } from "../components/admin-influencers";

export function AdminInfluencer() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Influencer", url: "/admin/influencer" }],
        }}
      />

      <AdminInfluencers />
    </>
  );
}
