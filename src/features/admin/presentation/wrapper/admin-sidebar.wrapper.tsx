import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AdminDrawerDesktop, AdminDrawerMobile } from "../components";
export function AdminSidebarWrapper() {
  const location = useLocation();

  useEffect(() => {
    document.getElementById("admin-main-section")?.scroll(0, 0);
  }, [location]);
  return (
    <main className="flex min-h-screen">
      <AdminDrawerDesktop />

      <section
        id="admin-main-section"
        className="flex-1 h-screen overflow-y-auto bg-paper"
      >
        <Outlet />
      </section>
    </main>
  );
}
