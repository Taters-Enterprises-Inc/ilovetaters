import { Outlet, useLocation } from "react-router-dom";
import { AuditDrawer } from "./audit-drawer";
import { useEffect } from "react";

export function AuditSidebarWrapper() {
  const location = useLocation();

  useEffect(() => {
    document.getElementById("audit-main-section")?.scroll(0, 0);
  }, [location]);

  return (
    <main className="flex min-h-screen">
      <AuditDrawer />
      <section
        id="audit-main-section"
        className="flex-1 h-screen overflow-y-auto bg-paper"
      >
        <Outlet />
      </section>
    </main>
  );
}
