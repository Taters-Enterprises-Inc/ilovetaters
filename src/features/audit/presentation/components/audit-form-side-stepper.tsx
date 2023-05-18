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
import { useAppSelector } from "features/config/hooks";
import { selectAuditSection } from "../slices/audit-section.slice";
import { AUDIT_STEPPER } from "features/shared/constants";

export function AuditFormSideStepper() {
  const currentSection = useAppSelector(selectAuditSection);

  return (
    <>
      <main className="flex min-h-screen">
        <section
          id="audit-form-main-section"
          className="flex-1 h-screen bg-paper"
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

                <div className="flex  ml-40 pb-10">
                  <Box sx={{ maxWidth: 300 }}>
                    <Stepper
                      activeStep={currentSection.section}
                      orientation="vertical"
                    >
                      {AUDIT_STEPPER.map((step, index) => (
                        <Step key={step.section}>
                          <StepLabel>{step.section}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>

                  <Divider orientation="vertical" flexItem />
                </div>
              </div>
            </div>

            <div className="mt-14 lg:w-3/5 lg:pr-28">
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
