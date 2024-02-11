import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { TicketingDrawer } from "./ticketing-drawer";

export function TicketingSidebarWrapper() {
  return (
    <main className="flex min-h-screen">
      <TicketingDrawer />
      <section
        id="audit-main-section"
        className="flex-1 h-screen overflow-y-auto bg-paper"
      >
        <Outlet />
      </section>
    </main>
  );
}
