import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SalesDrawer } from "./sales-drawer";

export function SalesSidebarWrapper() {
  return (
    <main className="flex min-h-screen">
      <SalesDrawer />
      <section
        id="audit-main-section"
        className="flex-1 h-screen overflow-y-auto bg-paper"
      >
        <Outlet />
      </section>
    </main>
  );
}
