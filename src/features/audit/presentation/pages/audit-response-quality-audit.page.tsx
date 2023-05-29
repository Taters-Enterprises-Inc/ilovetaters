import { AuditResponseQualityAudit } from "../components";
import { AuditHead } from "../components/audit-head";

export function AuditResponseQualityAuditPage() {
  return (
    <>
      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/internal/audit/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            {
              name: "Responses",
              url: "/internal/audit/responses",
            },
            {
              name: "Quality Audit",
              url: "/internal/audit/responses/quality/audit",
            },
          ],
        }}
      />

      <AuditResponseQualityAudit />
    </>
  );
}
