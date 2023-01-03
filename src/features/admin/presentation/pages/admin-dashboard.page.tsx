import { AdminDashboardSalesLineChart, AdminHead } from "../components";

export function AdminDashboard() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Orders", url: "/admin/order" }],
        }}
      />

      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Dashboard
        </span>
        <AdminDashboardSalesLineChart />
      </div>
    </>
  );
}
