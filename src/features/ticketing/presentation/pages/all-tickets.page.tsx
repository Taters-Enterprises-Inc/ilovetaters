import { AllTicketsContents } from "../components/ticketing-allticket-content";
import { TicketingHead } from "../components/ticketing-head";

export function AllTickets() {
  return (
    <>
      <TicketingHead
        TicketingBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/ticketing/all-tickets",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "All Tickets", url: "/admin/ticketing/all-tickets" },
          ],
        }}
      />

      <div className="p-4">
        <AllTicketsContents />
      </div>
    </>
  );
}
