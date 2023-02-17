import { AdminHead } from "../components";
import { AdminUserDiscounts } from "../components/admin-user-discounts";

export function AdminUserDiscount() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "User Discount", url: "/admin/user-discount" }],
        }}
      />

      <AdminUserDiscounts />
    </>
  );
}
