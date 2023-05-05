import { Container, Divider, Grid, Paper } from "@mui/material";
import React from "react";
import { AuditHead } from "./audit-head";
import { AuditFormSideStepper } from "./audit-form-side-stepper";

export function AuditFormContent() {
  return (
    <>
      <Container className="py-4 px-14" maxWidth="lg">
        <div className="flex flex-col space-y-10">
          <AuditHead
            AuditBreadCrumbsProps={{
              home: {
                title: "Home",
                url: "/internal/audit/dashboard",
              },
              className: "lg:h-[200px]",
              pageTitles: [{ name: "Form", url: "/internal/audit/form" }],
            }}
          />

          <div>
            <h1 className="flex justify-center text-3xl">
              INTERNAL QUALITY AUDIT FORM
            </h1>
          </div>

          <Grid container>
            <Grid className="p-5" item xs={4}>
              <AuditFormSideStepper ActiveSteps={0} />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs></Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
