import { useNavigate } from "react-router-dom";
import { AuditFormContent, AuditResponseQualityAudit } from "../components";
import { AuditHead } from "../components/audit-head";
import { Fab } from "@mui/material";
import { TiDocumentAdd } from "react-icons/ti";

export function AuditResponseQualityAuditPage() {
  const navigate = useNavigate();

  return (
    <>
      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/internal/dashboard/audit",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            {
              name: "Responses",
              url: "/internal/responses/quality/audit",
            },
            {
              name: "Quality Audit",
              url: "/internal/responses/quality/audit",
            },
          ],
        }}
      />

      <AuditResponseQualityAudit />
      <div
        className="absolute right-10 bottom-10"
        onClick={() => navigate("/internal/audit/form")}
      >
        <Fab color="primary">
          <TiDocumentAdd className="text-3xl" />
        </Fab>
      </div>
    </>
  );
}
