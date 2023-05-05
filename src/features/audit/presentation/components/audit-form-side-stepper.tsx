import React from "react";
import {
  Box,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

interface StepsProps {
  ActiveSteps: number;
}

export function AuditFormSideStepper(props: StepsProps) {
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
    <Box sx={{ maxWidth: 300 }}>
      <Stepper activeStep={props.ActiveSteps} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.section}>
            <StepLabel>{step.section}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {props.ActiveSteps === 8 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All sections completed - you&apos;re finished</Typography>
        </Paper>
      )}
    </Box>
  );
}
