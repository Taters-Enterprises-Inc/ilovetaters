import React, { useEffect } from "react";
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
import { Audit } from "../pages";

export function AuditFormSideStepper() {
  const currentSection = useAppSelector(selectAuditSection);

  useEffect(() => {
    if (
      AUDIT_STEPPER.length > currentSection.maxLength &&
      currentSection.section === 1
    ) {
      console.log("test");
      AUDIT_STEPPER.pop();
    }
  }, [currentSection.maxLength, AUDIT_STEPPER]);

  return (
    <>
      <main className="flex min-h-screen">
        <section
          id="audit-form-main-section"
          className="flex-1 h-screen bg-paper"
        >
          <div className="flex flex-col md:flex-row bg-paper">
            <div className="lg:relative">
              <div className="sticky top-5">
                <Link
                  className="flex ml-2 md:ml-10 mt-5 md:mb-10"
                  to={"dashboard"}
                >
                  <span className="flex font-normal">
                    <MdOutlineArrowBackIos className="mt-[6px] mr-3 text-sm" />
                    Back to Dashboard
                  </span>
                </Link>

                {currentSection.section ? (
                  <div className="hidden md:block">
                    <div className="flex ml-40 pb-10">
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
                ) : null}
              </div>
            </div>

            <div className="flex-1 mt-14 flex justify-center">
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
