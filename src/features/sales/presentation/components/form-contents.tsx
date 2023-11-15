import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StepLabel, TextField } from "@mui/material";
import { FormStepperNavigation } from ".";
import { ChangeEvent, useEffect, useState } from "react";
import {
  GetSalesActiveFieldsState,
  getSalesActiveFields,
  selectGetSalesActiveFields,
} from "../slices/get-active-fields.slice";
import {
  MaterialInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";

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

  const fieldData = () => {
    if (getSalesActiveFieldsState.data?.field_data[activeStep]?.field) {
      console.log(
        getSalesActiveFieldsState.data?.field_data[activeStep]?.field[1]
      );
    }

    const getFormField =
      getSalesActiveFieldsState.data?.field_data[activeStep]?.field;

    return (
      <>
        {getFormField?.map((field) => (
          <>
            {field.field_data.length !== 0 && (
              <span className="w-full text-base md:text-lg text-black text-bold mt-4">
                {field.sub_section}
              </span>
            )}

            {field.field_data.flatMap((field) => (
              <div className={`w-[100%] md:px-10 py-2`} key={field.id}>
                <span className="text-black text-xs md:text-base font-normal normal-case">
                  {field.field_name}
                </span>
                <div className="w-full ">
                  {field.is_dropdown ? (
                    <MaterialInputAutoComplete
                      colorTheme={"black"}
                      options={[]}
                      label={""}
                      size="small"
                      isOptionEqualToValue={function (
                        option: any,
                        value: any
                      ): boolean {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  ) : (
                    <MaterialInput
                      colorTheme={"black"}
                      onChange={() => {}}
                      size="small"
                      fullWidth
                      name={""}
                    />
                  )}
                </div>
              </div>
            ))}
          </>
        ))}
      </>
    );
  };

  const handleSubmit = () => {};

  return (
    <>
      {getAdminSessionState.data?.admin ? (
        <div className="flex flex-wrap">
          <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 w-full md:w-3/3">
            <div className="mb-8 mt-2 w-full">
              <Stepper nonLinear activeStep={activeStep}>
                {getSalesActiveFieldsState.data?.field_data.map(
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

            <form className="lg:px-44" onSubmit={handleSubmit}>
              <div className="flex flex-col bg-secondary rounded-t-md text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
                {getSalesActiveFieldsState.data?.field_data[activeStep].section}
              </div>
              <div className="flex flex-col bg-white rounded-b-lg border border-secondary flex-1 p-4">
                <div className="flex flex-wrap lg:px-20 lg:pt-5">
                  {fieldData()}
                </div>
              </div>

              <FormStepperNavigation
                activeStep={activeStep}
                totalSteps={
                  getSalesActiveFieldsState.data?.field_data.length ?? 6
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
