import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export function AdminSidebarWrapper() {
  return (
    <main className="flex min-h-screen ">
      <Sidebar />

      <section className="flex-1 bg-paper">
        <Outlet />
      </section>
    </main>
  );
}
