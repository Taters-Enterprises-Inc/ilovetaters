import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./admin-sidebar";

export function AdminSidebarWrapper() {
  return (
    <main className="flex min-h-screen">
      <AdminSidebar />

      <section className="flex-1 h-screen overflow-y-auto bg-paper">
        <Outlet />
      </section>
    </main>
  );
}
