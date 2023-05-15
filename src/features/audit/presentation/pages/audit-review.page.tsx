import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { HeaderNav } from "features/shared/presentation/components";
import React from "react";
import { Helmet } from "react-helmet";

export function AuditReview() {
  return (
    <>
      <Helmet>
        <title>Taters | Internal Quality Audit</title>
      </Helmet>

      <main className="min-h-screen bg-paper"></main>
    </>
  );
}
