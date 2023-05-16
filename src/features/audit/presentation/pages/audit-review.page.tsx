import { Helmet } from "react-helmet";
import { AuditReviewContent } from "../components";

export function AuditReview() {
  return (
    <>
      <Helmet>
        <title>Taters | Internal Quality Audit</title>
      </Helmet>

      <main className="min-h-screen bg-paper">
        <AuditReviewContent />
      </main>
    </>
  );
}
