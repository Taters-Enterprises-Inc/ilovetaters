import { TicketingHead } from "../components/ticketing-head";
import { ViewTicketContents } from "../components/ticketing-viewticket-content";

export function ViewTicket() {
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
            { name: "Ticketing" },
            { name: "Ticket #159", url: "/admin/ticketing/view-ticket" },
          ],
        }}
      />

      <div className="p-8">
        <ViewTicketContents />
      </div>
    </>
  );
}
