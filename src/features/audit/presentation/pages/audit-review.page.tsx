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
            url: "/internal/audit/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Audit Responses", url: "/internal/audit/review" },
          ],
        }}
      />

      <main className="min-h-screen bg-paper">
        <AuditReviewContent />
      </main>
    </>
  );
}
