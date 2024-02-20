import { SubmitTicketContents } from "../components/ticketing-submit-ticket-content";
import { TicketingHead } from "../components/ticketing-head";

export function SubmitTicket() {
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
            { name: "Submit a Ticket", url: "/admin/ticketing/submit-ticket" },
          ],
        }}
      />

      <div className="p-8">
        <SubmitTicketContents />
      </div>
    </>
  );
}
