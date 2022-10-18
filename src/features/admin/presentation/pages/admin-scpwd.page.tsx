import { AdminHead } from "../components";
import { AdminDiscountVerification } from "../components/admin-discount-verification";

export function ScPwd() {
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "SC/PWD", url: "/admin/scpwd" }],
        }}
      />

      <AdminDiscountVerification />
    </>
  );
}
