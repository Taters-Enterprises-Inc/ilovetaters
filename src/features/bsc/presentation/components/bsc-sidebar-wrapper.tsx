import { Outlet } from "react-router-dom";
import BSCDrawerDesktop from "./bsc-drawer-desktop";

export function BSCSidebarWrapper() {
  return (
    <main className="flex min-h-screen">
      <BSCDrawerDesktop />

      <section className="flex-1 h-screen overflow-y-auto bg-paper">
        <Outlet />
      </section>
    </main>
  );
}
