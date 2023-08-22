import { Fab } from "@mui/material";
import { TiDocumentAdd } from "react-icons/ti";
import { AuditDashboardContent, AuditHead } from "../components";
import { useNavigate } from "react-router-dom";

export function AuditDashboard() {
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
            { name: "Dashboard", url: "/internal/dashboard/audit" },
            {
              name: "Quality Audit",
              url: "/internal/dashboard/audit",
            },
          ],
        }}
      />
      <AuditDashboardContent />
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
