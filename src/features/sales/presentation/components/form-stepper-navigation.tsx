import { Box, Button } from "@mui/material";
import React from "react";

interface FormStepperNavigationProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  totalSteps: number;
  setCompleted: (
    prevCompletedUpdater: (prevCompleted: { [key: number]: boolean }) => {
      [key: number]: boolean;
    }
  ) => void;
}

export function FormStepperNavigation(props: FormStepperNavigationProps) {
  const isLastStep = () => {
    return props.activeStep === props.totalSteps - 1;
  };

  const handleNext = () => {
    const newStep = props.activeStep + 1;
    props.setActiveStep(newStep);

    props.setCompleted((prevCompleted) => ({
      ...prevCompleted,
      [newStep - 1]: true,
    }));
  };

  const handleBack = () => {
    props.setCompleted((prevCompleted) => {
      const { [props.activeStep]: _, ...newCompleted } = prevCompleted;
      return { ...newCompleted, [props.activeStep - 1]: false };
    });
    props.setActiveStep(props.activeStep - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        pt: 2,
      }}
    >
      <Button
        color="inherit"
        disabled={props.activeStep === 0}
        style={{ minWidth: 100 }}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>

      <Box>
        <Button
          type="submit"
          style={{ minWidth: 100 }}
          onClick={handleNext}
          sx={{ mr: 1 }}
          disabled={isLastStep()}
        >
          Next
        </Button>

        <Button
          type="submit"
          style={{ minWidth: 100 }}
          sx={{ mr: 1 }}
          disabled={!isLastStep()}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
