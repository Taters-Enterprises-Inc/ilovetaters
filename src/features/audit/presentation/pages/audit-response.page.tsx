import { AuditHead } from "../components/audit-head";

export function AuditResponse() {
  return (
    <>
      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/digital/audit/response",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Responses", url: "/digital/audit/response" }],
        }}
      />
    </>
  );
}
