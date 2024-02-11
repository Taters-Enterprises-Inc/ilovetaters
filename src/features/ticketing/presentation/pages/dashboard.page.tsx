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
    </>
  );
}
