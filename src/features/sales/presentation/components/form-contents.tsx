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
  MaterialDateInput,
  MaterialInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import { SubmitFormParam } from "features/sales/core/sales.param";
import { salesSubmitForm } from "../slices/sales-submit-form.slice";
import dayjs from "dayjs";

export function SalesFormContent() {
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getSalesActiveFieldsState = useAppSelector(selectGetSalesActiveFields);

  // stepper
  const [activeStep, setActiveStep] = useState(0);

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [formState, setFormState] = useState<SubmitFormParam>();

  useEffect(() => {
    if (
      getSalesActiveFieldsState.status !== GetSalesActiveFieldsState.success &&
      !getSalesActiveFieldsState.data
    ) {
      dispatch(getSalesActiveFields());
    }
  }, [getSalesActiveFieldsState.data]);

  const fieldData = () => {
    const getFormField =
      getSalesActiveFieldsState.data?.field_data[activeStep]?.field;

    const formStateFieldValue = (sectionName: string, fieldName: string) => {
      return formState?.[sectionName]?.[fieldName]?.value || "";
    };

    const setDynamicOption = (name: string) => {
      switch (name) {
        case "shift":
          return ["AM", "PM"];

        case "store":
          return getSalesActiveFieldsState.data?.list_of_stores.map(
            (store) => store.name
          );

        case "discount":
          return getSalesActiveFieldsState.data?.discount_type.map(
            (discount) => discount.name
          );

        case "gcOriginatingStore":
          return getSalesActiveFieldsState.data?.list_of_stores.map(
            (store) => store.name
          );
      }

      return null;
    };

    return (
      <>
        {getFormField?.map((field) => (
          <>
            {field.field_data.length !== 0 ? (
              <span className="w-full text-base md:text-lg text-black font-semibold mt-4">
                {field.sub_section}
              </span>
            ) : null}

            {field.field_data.flatMap((field) => (
              <div
                className={`w-[100%] md:px-10 py-3 space-y-3`}
                key={field.id}
              >
                <span className=" text-black text-xs md:text-base font-normal normal-case">
                  {field.field_name}
                </span>

                <div className="w-full ">
                  {field.is_dropdown || field.is_date_field ? (
                    <>
                      {field.is_dropdown ? (
                        <MaterialInputAutoComplete
                          size="small"
                          colorTheme={"black"}
                          placeholder={field.field_name}
                          required={field.is_required}
                          options={setDynamicOption(field.name) ?? []}
                          isOptionEqualToValue={(option, value) =>
                            option === value
                          }
                          value={formStateFieldValue(
                            field.section_name,
                            field.name
                          ).toString()}
                          onChange={(event, selectedValue) =>
                            handleOnChange(
                              field.section_name,
                              field.name,
                              selectedValue
                            )
                          }
                        />
                      ) : null}

                      {field.is_date_field ? (
                        <MaterialDateInput
                          disableFuture
                          required={field.is_required}
                          colorTheme={"black"}
                          size="small"
                          // shouldDisableDate={(date) => isFutureDate(date)}
                          value={formStateFieldValue(
                            field.section_name,
                            field.name
                          ).toString()}
                          placeholder={field.field_name}
                          onChange={(selectedDate: Date | null) =>
                            handleOnChange(
                              field.section_name,
                              field.name,
                              selectedDate
                            )
                          }
                        />
                      ) : null}
                    </>
                  ) : (
                    <MaterialInput
                      fullWidth
                      type={field.name === "emailAddress" ? "email" : "text"}
                      size="small"
                      name={field.name}
                      colorTheme={"black"}
                      required={field.is_required}
                      value={formStateFieldValue(
                        field.section_name,
                        field.name
                      ).toString()}
                      placeholder={field.field_name}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleOnChange(
                          field.section_name,
                          event.target.name,
                          event.target.value
                        )
                      }
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

  const handleOnChange = (
    sectionName: string,
    fieldName: string,
    val: string | Date | null
  ) => {
    setFormState((prevData) => ({
      ...prevData,
      [sectionName]: {
        ...(prevData && prevData[sectionName]),
        [fieldName]: { value: val },
      },
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (formState !== undefined) {
      dispatch(salesSubmitForm(formState));
    }
  };

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
