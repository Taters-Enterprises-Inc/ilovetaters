import { TicketingHead } from "../components/ticketing-head";
import { MyTicketContents } from "../components/ticketing-myticket-content";

export function MyTickets() {
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
            { name: "My Tickets", url: "/admin/ticketing/my-tickets" },
          ],
        }}
      />

      <div className="p-8">
        <MyTicketContents />
      </div>
    </>
  );
}
