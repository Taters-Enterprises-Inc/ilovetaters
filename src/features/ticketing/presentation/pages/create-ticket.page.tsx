import { TicketingHead } from "../components/ticketing-head";

export function CreateTicket() {
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
            { name: "Create Ticket", url: "/admin/ticketing/create-ticket" },
          ],
        }}
      />

      <div className="p-8"></div>
    </>
  );
}
