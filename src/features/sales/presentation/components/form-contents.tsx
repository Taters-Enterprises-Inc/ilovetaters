import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StepLabel } from "@mui/material";
import { FormFieldData, FormStepperNavigation } from ".";
import React, { useEffect, useState } from "react";
import {
  GetSalesActiveFieldsState,
  getSalesActiveFields,
  selectGetSalesActiveFields,
} from "../slices/get-active-fields.slice";
import { SubmitFormParam } from "features/sales/core/sales.param";
import { salesSubmitForm } from "../slices/sales-submit-form.slice";
import { getEmptyRequiredFields, setDynamicOption } from "./sales-utils";
import { useNavigate } from "react-router-dom";

export function SalesFormContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getSalesActiveFieldsState = useAppSelector(selectGetSalesActiveFields);

  // stepper
  const [activeStep, setActiveStep] = useState(0);

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [formState, setFormState] = useState<SubmitFormParam["formState"]>();

  useEffect(() => {
    if (
      getSalesActiveFieldsState.status !== GetSalesActiveFieldsState.success &&
      !getSalesActiveFieldsState.data
    ) {
      dispatch(getSalesActiveFields());
    }
  }, [getSalesActiveFieldsState.data]);

  const handleSubmit = (
    e: { preventDefault: () => void },
    isSaved: boolean
  ) => {
    e.preventDefault();

    if (formState !== undefined) {
      dispatch(salesSubmitForm({ formState, saveStatus: isSaved }));
      navigate("/admin/sales/form-list");
    }
  };

  return (
    <>
      {getAdminSessionState.data?.admin && getSalesActiveFieldsState.data ? (
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

            <form className="lg:px-44" onSubmit={(e) => handleSubmit(e, false)}>
              <div className="flex flex-col bg-secondary rounded-t-md text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
                {getSalesActiveFieldsState.data?.field_data[activeStep].section}
              </div>
              <div className="flex flex-col bg-white rounded-b-lg border border-secondary flex-1 p-4">
                <div className="flex flex-wrap w-full lg:px-20 lg:pt-5">
                  {/* {fieldData()} */}

                  <FormFieldData
                    salesActiveFieldState={getSalesActiveFieldsState.data}
                    activeStep={activeStep}
                    formState={formState || {}}
                    setFormState={(
                      data: SubmitFormParam["formState"] | undefined
                    ) => setFormState(data || {})}
                  />
                </div>
              </div>

              <FormStepperNavigation
                activeStep={activeStep}
                totalSteps={
                  getSalesActiveFieldsState.data?.field_data.length ?? 6
                }
                requiredCheck={getEmptyRequiredFields(
                  getSalesActiveFieldsState.data,
                  activeStep,
                  formState
                )}
                setActiveStep={(step) => setActiveStep(step)}
                setCompleted={(complete) => setCompleted(complete)}
                handleSubmit={handleSubmit}
              />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
