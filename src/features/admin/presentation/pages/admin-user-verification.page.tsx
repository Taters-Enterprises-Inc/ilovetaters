import { AdminHead } from "../components";

export function AdminUserVerification() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "User Verification", url: "/admin/user-verification" },
          ],
        }}
      />
    </>
  );
}
