import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StepLabel, TextField } from "@mui/material";
import { FormStepperNavigation } from ".";
import { useEffect, useState } from "react";
import {
  GetSalesActiveFieldsState,
  getSalesActiveFields,
  selectGetSalesActiveFields,
} from "../slices/get-active-fields.slice";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";

const GeneralInformation = () => {
  return (
    <>
      <div className="flex flex-col bg-secondary rounded-t-lg text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
        General Information
      </div>
      <div className="flex flex-col bg-white rounded-b-lg border border-secondary flex-1 p-4">
        {/* 
        -
        -
        -
        -
              General Info Here 
        -
        -
        -
        -
        */}
      </div>
    </>
  );
};

export function SalesFormContent() {
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getSalesActiveFieldsState = useAppSelector(selectGetSalesActiveFields);

  useEffect(() => {
    if (
      getSalesActiveFieldsState.status !== GetSalesActiveFieldsState.success &&
      !getSalesActiveFieldsState.data
    ) {
      dispatch(getSalesActiveFields());
    }
  }, [getSalesActiveFieldsState.data]);

  // stepper
  const [activeStep, setActiveStep] = useState(0);

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const handleSubmit = () => {};

  return (
    <>
      {getAdminSessionState.data?.admin ? (
        <div className="flex flex-wrap">
          <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 w-full md:w-3/3">
            <div className="mb-8 mt-2 w-full">
              <Stepper nonLinear activeStep={activeStep}>
                {getSalesActiveFieldsState.data?.form_data.map(
                  (label, index) => (
                    <Step key={label.section} completed={completed[index]}>
                      <StepLabel color="inherit">
                        <div className="hidden md:block">{label.section}</div>
                      </StepLabel>
                    </Step>
                  )
                )}
              </Stepper>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col bg-secondary rounded-t-md text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
                {getSalesActiveFieldsState.data?.form_data[activeStep].section}
              </div>
              <div className="flex flex-col bg-white rounded-b-lg border border-secondary flex-1 p-4">
                <div className="flex flex-wrap px-10">
                  {getSalesActiveFieldsState.data?.form_data[
                    activeStep
                  ].fields.map((field, index) => (
                    <div className="w-[50%] px-10 py-2" key={field.id}>
                      <span className="text-black font-normal normal-case">
                        {field.field_name}
                      </span>
                      <div className="w-full ">
                        {field.is_dropdown ? (
                          <MaterialInputAutoComplete
                            colorTheme={"black"}
                            options={[]}
                            label={""}
                            isOptionEqualToValue={function (
                              option: any,
                              value: any
                            ): boolean {
                              throw new Error("Function not implemented.");
                            }}
                          />
                        ) : (
                          <TextField
                            size="small"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <FormStepperNavigation
                activeStep={activeStep}
                totalSteps={
                  getSalesActiveFieldsState.data?.form_data.length ?? 6
                }
                setActiveStep={(step) => setActiveStep(step)}
                setCompleted={(complete) => setCompleted(complete)}
              />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
