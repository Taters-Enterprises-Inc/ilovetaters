import { Outlet } from "react-router-dom";
import { AdminDrawerDesktop, AdminDrawerMobile } from ".";
export function AdminSidebarWrapper() {
  return (
    <main className="flex min-h-screen">
      <AdminDrawerDesktop />
      <AdminDrawerMobile />

      <section className="flex-1 h-screen overflow-y-auto bg-paper">
        <Outlet />
      </section>
    </main>
  );
}
