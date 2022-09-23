import { Outlet } from "react-router-dom";
import { AdminDrawer } from ".";
export function AdminSidebarWrapper() {
  return (
    <main className="flex min-h-screen">
      <AdminDrawer />

      <section className="flex-1 h-screen overflow-y-auto bg-paper">
        <Outlet />
      </section>
    </main>
  );
}
