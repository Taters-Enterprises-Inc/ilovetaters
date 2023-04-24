import { AuditHead } from "../components";

export function AuditSettingsUsers() {
  return (
    <>
      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/digital/audit/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Manage Users", url: "/digital/audit/settings/users" },
          ],
        }}
      />
    </>
  );
}
