import { AdminHead, AdminCateringBookings } from "../components";

export function AdminCateringOrder() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Catering", url: "/admin/catering" }],
        }}
      />

      <AdminCateringBookings />
    </>
  );
}
