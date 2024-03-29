import { Helmet } from "react-helmet";
import { AuditHead, AuditReviewContent } from "../components";

export function AuditReview() {
  return (
    <>
      <Helmet>
        <title>Taters | Internal Quality Audit</title>
      </Helmet>

      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/internal/dashboard/audit",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            {
              name: "Audit Responses",
              url: "/internal/responses/quality/audit",
            },
          ],
        }}
      />

      <main className="min-h-screen bg-paper">
        <AuditReviewContent />
      </main>
    </>
  );
}
