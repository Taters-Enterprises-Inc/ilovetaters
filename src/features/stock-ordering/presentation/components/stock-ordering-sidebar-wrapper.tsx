import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { StockOrderDrawer } from "./stock-order-drawer";

export function StockAuditSidebarWrapper() {
  const location = useLocation();

  useEffect(() => {
    document.getElementById("audit-main-section")?.scroll(0, 0);
  }, [location]);

  return (
    <main className="flex min-h-screen">
      <StockOrderDrawer />
      <section
        id="audit-main-section"
        className="flex-1 h-screen overflow-y-auto bg-paper"
      >
        <Outlet />
      </section>
    </main>
  );
}
