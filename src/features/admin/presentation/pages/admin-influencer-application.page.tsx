import { AdminHead } from "../components";
import { AdminInfluencerApplications } from "../components/admin-influencers-applications";

export function AdminInfluencerApplication() {
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
              name: "Influencers Application",
              url: "/admin/influencer/application",
            },
          ],
        }}
      />

      <AdminInfluencerApplications />
    </>
  );
}
