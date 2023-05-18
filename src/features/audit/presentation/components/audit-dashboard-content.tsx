import { Fab } from "@mui/material";
import { TiDocumentAdd } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

export function AuditDashboardContent() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="absolute right-10 bottom-10"
        onClick={() => navigate("../form")}
      >
        <Fab color="primary">
          <TiDocumentAdd className="text-3xl" />
        </Fab>
      </div>
    </>
  );
}
