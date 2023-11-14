import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppSelector } from "features/config/hooks";
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  StepLabel,
  TextField,
  styled,
} from "@mui/material";
import { current } from "@reduxjs/toolkit";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 5,
    position: "relative",
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    fontWeight: 500,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 5,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const steps = [
  "General Information",
  "Payment Method",
  "Special Sales",
  "Discount",
  "Transactions",
  "Itemized Sales",
];

const GeneralInformation = (
  stepDispatch: React.Dispatch<React.SetStateAction<number>>
) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    stepDispatch(2);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [disableDiscount, setDisableDiscount] =
    React.useState<string>("Not Applicable");
  const [inputValue, setInputValue] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      {" "}
      <div className="mb-8 mt-2">
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepLabel color="inherit">
                  <div className="hidden md:block">{label}</div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div className="flex flex-col bg-secondary rounded-t-lg text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
        General Information
      </div>
      <div className="flex flex-col bg-white rounded-b-lg border border-secondary flex-1 p-4"></div>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              {}
              <Button
                style={{ minWidth: 100 }}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

const PaymentMethod = (
  stepDispatch: React.Dispatch<React.SetStateAction<number>>
) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    stepDispatch(3);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    stepDispatch(1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [disableDiscount, setDisableDiscount] =
    React.useState<string>("Not Applicable");
  const [inputValue, setInputValue] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLDivElement>(null);

  const selectDiscount = (message: string) => {
    setDisableDiscount(message);
    const input = inputRef.current?.querySelector("input");
    setInputValue(true);
    if (message == "Not Applicable") {
      setInputValue(false);
    }
    if (input) {
      if (input.value != "") {
        setInputValue(false);
      }
    }
  };

  return (
    <>
      {" "}
      <div className="mb-8 mt-2">
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepLabel color="inherit">
                  <div className="hidden md:block">{label}</div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div className="flex flex-col bg-secondary rounded-t-lg text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
        Payment Method
      </div>
      <div className="flex flex-col bg-white rounded-b-lg border border-secondary flex-1 p-4"></div>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                style={{ minWidth: 100 }}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {}
              <Button
                style={{ minWidth: 100 }}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

const SpecialSales = (
  stepDispatch: React.Dispatch<React.SetStateAction<number>>
) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    stepDispatch(4);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    stepDispatch(2);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [disableDiscount, setDisableDiscount] =
    React.useState<string>("Not Applicable");
  const [inputValue, setInputValue] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLDivElement>(null);

  const selectDiscount = (message: string) => {
    setDisableDiscount(message);
    const input = inputRef.current?.querySelector("input");
    setInputValue(true);
    if (message == "Not Applicable") {
      setInputValue(false);
    }
    if (input) {
      if (input.value != "") {
        setInputValue(false);
      }
    }
  };

  const checkInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | null>
  ) => {
    const inputValue: string = e.currentTarget.value;
    if (inputValue !== "") {
      setInputValue(false);
    } else {
      setInputValue(true);
    }
  };

  return (
    <>
      {" "}
      <div className="mb-8 mt-2">
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepLabel color="inherit">
                  <div className="hidden md:block">{label}</div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div className="flex flex-col bg-secondary rounded-t-lg text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
        Special Sales
      </div>
      <div className="flex flex-col bg-white rounded-b-lg border border-secondary flex-1 p-4"></div>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                style={{ minWidth: 100 }}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {}
              <Button
                style={{ minWidth: 100 }}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

const Discount = (
  stepDispatch: React.Dispatch<React.SetStateAction<number>>
) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    stepDispatch(5);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    stepDispatch(3);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [disableDiscount, setDisableDiscount] =
    React.useState<string>("Not Applicable");
  const [inputValue, setInputValue] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLDivElement>(null);

  const selectDiscount = (message: string) => {
    setDisableDiscount(message);
    const input = inputRef.current?.querySelector("input");
    setInputValue(true);
    if (message == "Not Applicable") {
      setInputValue(false);
    }
    if (input) {
      if (input.value != "") {
        setInputValue(false);
      }
    }
  };

  const checkInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | null>
  ) => {
    const inputValue: string = e.currentTarget.value;
    if (inputValue !== "") {
      setInputValue(false);
    } else {
      setInputValue(true);
    }
  };

  return (
    <>
      {" "}
      <div className="mb-8 mt-2">
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepLabel color="inherit">
                  <div className="hidden md:block">{label}</div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div className="flex flex-col bg-secondary rounded-t-lg text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
        Discount
      </div>
      <div className="flex flex-col bg-white rounded-b-lg border border-secondary flex-1 p-4">
        <div className="">
          <InputLabel>Type of Discount</InputLabel>
          <FormControl
            className="w-1/2 md:w-1/4"
            sx={{ m: 1 }}
            variant="standard"
            // style={{ minWidth: 500 }}
          >
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              fullWidth
              input={<BootstrapInput />}
            >
              <MenuItem
                value={"Not Applicable"}
                onClick={() => {
                  selectDiscount("Not Applicable");
                }}
              >
                Not Applicable
              </MenuItem>
              <MenuItem
                value={"Senior Citizen Discount"}
                onClick={() => {
                  selectDiscount("Senior Citizen Discount");
                }}
              >
                Senior Citizen Discount
              </MenuItem>
              <MenuItem
                value={"Person with Disability Discount"}
                onClick={() => {
                  selectDiscount("Person with Disability Discount");
                }}
              >
                Person with Disability Discount
              </MenuItem>
              <MenuItem
                value={"Other Discount"}
                onClick={() => {
                  selectDiscount("Other Discount (Please Specify)");
                }}
              >
                Other Discount
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        {disableDiscount != "Not Applicable" ? (
          <div className="pt-5">
            <InputLabel className="text-black font-semibold">
              {disableDiscount}
            </InputLabel>
            <div className="p-2">
              <TextField
                className="w-1/2 md:w-1/4"
                color="secondary"
                id="outlined-size-small"
                size="small"
                variant="outlined"
                ref={inputRef as React.RefObject<HTMLDivElement>}
                onChange={(e) => checkInput(e)}
                //style={{ maxWidth: 500 }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                style={{ minWidth: 100 }}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {}
              <Button
                disabled={inputValue}
                style={{ minWidth: 100 }}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

const Transactions = (
  stepDispatch: React.Dispatch<React.SetStateAction<number>>
) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    stepDispatch(6);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    stepDispatch(4);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [disableDiscount, setDisableDiscount] =
    React.useState<string>("Not Applicable");
  const [inputValue, setInputValue] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      {" "}
      <div className="mb-8 mt-2">
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepLabel color="inherit">
                  <div className="hidden md:block">{label}</div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div className="flex flex-col bg-secondary rounded-t-lg text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
        Transactions
      </div>
      <div className="flex flex-col bg-white rounded-b-lg border border-secondary flex-1 p-4">
        <div>
          <InputLabel className="text-black font-semibold">
            Transaction Count (POS)
          </InputLabel>
          <div className="p-2">
            <TextField
              className="w-1/2 md:w-1/4"
              color="secondary"
              id="outlined-size-small"
              size="small"
              variant="outlined"
              // style={{ minWidth: 500 }}
            />
          </div>
        </div>
        <div className="pt-5">
          <InputLabel className="text-black font-semibold">
            GC Originating Store
          </InputLabel>
          <div className="p-2">
            <TextField
              className="w-1/2 md:w-1/4"
              color="secondary"
              id="outlined-size-small"
              size="small"
              variant="outlined"
              // style={{ minWidth: 500 }}
            />
          </div>
        </div>
      </div>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                style={{ minWidth: 100 }}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {}
              <Button
                style={{ minWidth: 100 }}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

const ItemizedSales = (
  stepDispatch: React.Dispatch<React.SetStateAction<number>>
) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  // const handleNext = () => {
  //   const newActiveStep =
  //     isLastStep() && !allStepsCompleted()
  //       ? // It's the last step, but not all steps have been completed,
  //         // find the first step that has been completed
  //         steps.findIndex((step, i) => !(i in completed))
  //       : activeStep + 1;
  //   setActiveStep(newActiveStep);
  //   stepDispatch(6);
  // };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    stepDispatch(5);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [disableDiscount, setDisableDiscount] =
    React.useState<string>("Not Applicable");
  const [inputValue, setInputValue] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      {" "}
      <div className="mb-8 mt-2">
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepLabel color="inherit">
                  <div className="hidden md:block">{label}</div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div className="flex flex-col bg-secondary rounded-t-lg text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
        Itemized Sales
      </div>
      <div className="flex flex-col bg-white rounded-b-lg border border-secondary flex-1 p-4"></div>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                style={{ minWidth: 100 }}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {}
              <Button
                style={{ minWidth: 100 }}
                // onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Finish
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

export function SalesFormContent() {
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  // stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const setPages = () => {
    if (currentStep == 1) {
      return GeneralInformation(setCurrentStep);
    } else if (currentStep == 2) {
      return PaymentMethod(setCurrentStep);
    } else if (currentStep == 3) {
      return SpecialSales(setCurrentStep);
    } else if (currentStep == 4) {
      return Discount(setCurrentStep);
    } else if (currentStep == 5) {
      return Transactions(setCurrentStep);
    } else if (currentStep == 6) {
      return ItemizedSales(setCurrentStep);
    }
  };

  return (
    <>
      {getAdminSessionState.data?.admin ? (
        <div className="flex flex-col space-y-5">
          <div>
            <span className="text-secondary text-4xl font-['Bebas_Neue'] flex-1">
              Form
            </span>
          </div>

          <div className="flex flex-wrap">
            <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 w-full md:w-3/3">
              {setPages()}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
