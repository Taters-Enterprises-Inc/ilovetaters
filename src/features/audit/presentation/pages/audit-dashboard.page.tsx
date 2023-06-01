import { AuditHead } from "../components";

export function AuditDashboard() {
  return (
    <>
      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/internal/audit/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Dashboard", url: "/internal/audit/dashboard" }],
        }}
      />
    </>
  );
}
