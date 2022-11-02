import { Outlet } from "react-router-dom";
import BSCDrawerDesktop from "./bsc-drawer-desktop";
import { BSCDrawerMobile } from "./bsc-drawer-mobile";

export function BSCSidebarWrapper() {
  return (
    <main className="flex min-h-screen">
      <BSCDrawerDesktop />
      <BSCDrawerMobile />

      <section className="flex-1 h-screen overflow-y-auto bg-paper">
        <Outlet />
      </section>
    </main>
  );
}
