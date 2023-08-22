import React, { useEffect, useState } from "react";
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
import { AUDIT_STEPPER, safetySection } from "features/shared/constants";
import { Audit } from "../pages";
import { current } from "@reduxjs/toolkit";

export function AuditFormSideStepper() {
  const currentSection = useAppSelector(selectAuditSection);
  const [activeSteps, setActiveSteps] = useState(0);

  useEffect(() => {
    if (
      AUDIT_STEPPER.length > currentSection.maxLength &&
      currentSection.section === 1
    ) {
      console.log("test");
      AUDIT_STEPPER.pop();
    }
  }, [currentSection.maxLength, AUDIT_STEPPER]);

  useEffect(() => {
    if (currentSection.section >= 4) {
      setActiveSteps(currentSection.section - 1);
    } else {
      setActiveSteps(currentSection.section);
    }
  }, [currentSection.section, activeSteps]);

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
                  to={"dashboard/audit"}
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
                          activeStep={activeSteps}
                          orientation="vertical"
                        >
                          {AUDIT_STEPPER.map((step, index) => (
                            <Step key={index}>
                              <StepLabel>{step.section}</StepLabel>
                              {index === 3 ? (
                                <StepContent>
                                  <Stepper
                                    activeStep={currentSection.section - 3}
                                    orientation="vertical"
                                  >
                                    {safetySection.map((steps, iteration) => (
                                      <Step key={iteration}>
                                        <StepLabel>{steps.section}</StepLabel>
                                      </Step>
                                    ))}
                                  </Stepper>
                                </StepContent>
                              ) : null}
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

            <div className="flex-1 mt-14">
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
