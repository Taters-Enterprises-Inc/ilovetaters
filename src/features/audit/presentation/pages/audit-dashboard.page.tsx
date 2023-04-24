import React from "react";
import { AuditHead } from "../components";

export function AuditDashboard() {
  return (
    <>
      <AuditHead
        AuditBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/digital/audit/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Dashboard", url: "/digital/audit/dashboard" }],
        }}
      />
    </>
  );
}
