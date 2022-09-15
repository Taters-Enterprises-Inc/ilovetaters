import { Outlet } from "react-router-dom";
import { AdminHead } from "./admin-head";
import Sidebar from "./sidebar";

export function AdminSidebarWrapper() {
  return (
    <section className="flex min-h-screen ">
      <Sidebar />

      <div className="flex-1 min-h-screen p-2 overflow-y-hidden text-white bg-paper">
        <AdminHead />
        <Outlet />
      </div>
    </section>
  );
}
