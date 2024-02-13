import { TicketingDashboardContents } from "../components/ticketing-dashboard-content";
import { TicketingHead } from "../components/ticketing-head";

export function TicketingDashboard() {
  return (
    <>
      <TicketingHead
        TicketingBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/ticketing/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Dashboard", url: "/admin/ticketing/dashboard" },
          ],
        }}
      />

      <div className="p-4">
        <TicketingDashboardContents />
      </div>
    </>
  );
}
