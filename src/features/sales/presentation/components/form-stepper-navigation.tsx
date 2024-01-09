import { Box, Button } from "@mui/material";
import React from "react";

interface FormStepperNavigationProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  totalSteps: number;
  requiredCheck: string[];
  setCompleted: (
    prevCompletedUpdater: (prevCompleted: { [key: number]: boolean }) => {
      [key: number]: boolean;
    }
  ) => void;
  handleSubmit: (e: any, isSaved: boolean) => void;
}

export function FormStepperNavigation(props: FormStepperNavigationProps) {
  const isLastStep = () => {
    return props.activeStep === props.totalSteps - 1;
  };

  const handleNext = () => {
    if (props.requiredCheck.length === 0) {
      const newStep = props.activeStep + 1;
      props.setActiveStep(newStep);

      props.setCompleted((prevCompleted) => ({
        ...prevCompleted,
        [newStep - 1]: true,
      }));
    }
  };

  const handleBack = () => {
    props.setCompleted((prevCompleted) => {
      const { [props.activeStep]: _, ...newCompleted } = prevCompleted;
      return { ...newCompleted, [props.activeStep - 1]: false };
    });
    props.setActiveStep(props.activeStep - 1);
  };

  const style = {
    mr: 1,
    width: {
      xs: "100%",
      sm: "100%",
      md: "auto",
      lg: "auto",
    },
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
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Button
          color="inherit"
          disabled={props.activeStep === 0}
          style={{ minWidth: 100 }}
          onClick={handleBack}
          sx={style}
        >
          Back
        </Button>

        <Button
          style={{ minWidth: 100 }}
          onClick={handleNext}
          sx={style}
          disabled={isLastStep() || props.requiredCheck.length !== 0}
        >
          Next
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Button
          type="submit"
          style={{ minWidth: 100 }}
          sx={style}
          onClick={(e) => props.handleSubmit(e, true)}
          disabled={isLastStep() || props.requiredCheck.length !== 0}
        >
          Save
        </Button>

        <Button
          type="submit"
          style={{ minWidth: 100 }}
          sx={style}
          disabled={!isLastStep()}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
