import { Outlet } from "react-router-dom";
import HrDrawerDesktop from "./hr-drawer-desktop";

export function HrSidebarWrapper() {
  return (
    <main className="flex min-h-screen">
      <HrDrawerDesktop />

      <section className="flex-1 h-screen overflow-y-auto bg-paper">
        <Outlet />
      </section>
    </main>
  );
}
