import { AuditHead } from "../components/audit-head";

export function AuditResponse() {
  return (
    <>
      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/internal/audit/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Responses", url: "/internal/audit/response" }],
        }}
      />
    </>
  );
}
