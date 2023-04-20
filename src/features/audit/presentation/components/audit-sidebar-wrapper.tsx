import { Outlet } from "react-router-dom";
import { AuditDrawer } from "./audit-drawer";

export function AuditSidebarWrapper() {
  return (
    <main className="flex min-h-screen">
      <AuditDrawer />
      {/* <section className="flex-1 h-screen overflow-y-auto bg-paper">
        <Outlet />
      </section> */}
    </main>
  );
}
