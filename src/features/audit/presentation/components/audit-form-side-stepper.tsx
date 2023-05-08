import React from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { AuditHead } from "./audit-head";
import { AuditFormContent } from "./audit-form-content";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";

// interface StepsProps {
//   ActiveSteps: number;
// }

export function AuditFormSideStepper() {
  const steps = [
    {
      section: "Settings Store Information",
    },
    {
      section: "ENVIRONMENT",
    },
    {
      section: "SAFETY 3.1 SAFE FOOD HANDLING/ FACILITY SAFETY/FOOD SANITATION",
    },
    {
      section: "SAFETY 3.2 FOOD SAFETY PROCESS FLOW",
    },
    {
      section: "PRODUCT QUALITY/FOOD PREPARATION",
    },
    {
      section: "MATERIALS MANAGEMENT",
    },
    {
      section: "CASH HANDLING",
    },
    {
      section: "EQUIPMENT OPERATIONS MAINTENANCE",
    },
    {
      section: "RESOURCE MANAGEMENT",
    },
  ];

  return (
    <>
      <main className="flex min-h-screen">
        <section
          id="audit-form-main-section"
          className="flex-1 h-screen overflow-y-auto bg-paper"
        >
          <div className="flex bg-paper">
            <div className="hidden lg:relative lg:block">
              <div className="sticky top-5">
                <Link className="flex ml-10 mt-5 mb-10" to={"dashboard"}>
                  <span className="flex font-normal">
                    <MdOutlineArrowBackIos className="mt-[6px] mr-3 text-sm" />
                    Back to Dashboard
                  </span>
                </Link>

                <div className="flex  ml-40">
                  <Box sx={{ maxWidth: 300 }}>
                    <Stepper activeStep={0} orientation="vertical">
                      {steps.map((step, index) => (
                        <Step key={step.section}>
                          <StepLabel>{step.section}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    {/* {1 === 8 && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                      <Typography>All sections completed - you&apos;re finished</Typography>
                    </Paper>
                  )} */}
                  </Box>

                  <Divider orientation="vertical" flexItem />
                </div>
              </div>
            </div>

            <div className="mt-20 lg:w-3/5 lg:pr-28">
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
