import {
  MaterialInputAutoComplete,
  MaterialDateInput,
  MaterialInput,
} from "features/shared/presentation/components";
import React, { useEffect, useState } from "react";
import { setDynamicOption, updateFormState } from "./sales-utils";
import { SalesActiveFieldsModel } from "features/sales/core/domain/active-fields.model";
import { SubmitFormParam } from "features/sales/core/sales.param";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppSelector } from "features/config/hooks";

interface FormFieldDataProps {
  salesActiveFieldState: SalesActiveFieldsModel | undefined;
  activeStep: number;
  formState: SubmitFormParam["formState"];
  setFormState: (prevData: SubmitFormParam["formState"] | undefined) => void;
  disabled?: boolean;
}

export function FormFieldData(props: FormFieldDataProps) {
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const getFormField =
    props.salesActiveFieldState?.field_data[props.activeStep]?.field;

  const name =
    getAdminSessionState.data?.admin.user_details.first_name +
    " " +
    getAdminSessionState.data?.admin.user_details.last_name;
  const email = getAdminSessionState.data?.admin.email;

  useEffect(() => {
    const cashier =
      getAdminSessionState.data?.admin.user_details.sales_groups.some(
        (group) => group.id === 1
      );

    if (cashier) {
      const emailAndName: SubmitFormParam["formState"] = {
        "General Information": {
          cashier_name: { value: name },
          email: { value: email ?? "" },
        },
      };

      props.setFormState(emailAndName);
    }
  }, [getAdminSessionState.data]);

  const formStateFieldValue = (sectionName: string, fieldName: string) => {
    return props.formState?.[sectionName]?.[fieldName]?.value || "";
  };

  const dropdownValue = (sectionName: string, fieldName: string) => {
    const discountName = props.salesActiveFieldState?.discount_type.find(
      (discountType) =>
        discountType.id === formStateFieldValue(sectionName, fieldName)
    );

    if (fieldName === "discount") {
      return { name: discountName?.name };
    } else {
      return { name: formStateFieldValue(sectionName, fieldName) };
    }
  };

  const handleOnChange = (
    sectionName: string,
    fieldName: string,
    val: string | Date | null,
    dataType: string
  ) => {
    if (typeof val === "string") {
      if (dataType === "number") {
        val = val.replace(/[^0-9]/g, "");
      }
    }
    props.setFormState(
      updateFormState(props.formState, { sectionName, fieldName, val })
    );
  };

  const textFieldDisable = (fieldName: string) => {
    if (fieldName === "cashier_name" || fieldName === "email") {
      return true;
    } else {
      return props.disabled;
    }
  };

  return (
    <>
      {getFormField?.map((field) => (
        <React.Fragment key={field.sub_section}>
          {field.field_data.length !== 0 ? (
            <span className="w-full text-base md:text-lg text-black font-semibold mt-4">
              {field.sub_section}
            </span>
          ) : null}

          {field.field_data.flatMap((field) => (
            <div className={`w-[100%] md:px-10 py-3 space-y-3`} key={field.id}>
              <div>
                <span className=" text-black text-xs md:text-base font-normal normal-case">
                  {field.field_name}
                </span>
                {field.is_required ? (
                  <span className="text-red-800 mx-1">*</span>
                ) : null}
              </div>

              <div className="w-full ">
                {field.is_dropdown || field.is_date_field ? (
                  <>
                    {field.is_dropdown ? (
                      <MaterialInputAutoComplete
                        size="small"
                        disabled={props.disabled}
                        colorTheme={"black"}
                        placeholder={field.field_name}
                        required={field.is_required}
                        options={
                          setDynamicOption(
                            props.salesActiveFieldState,
                            field.name
                          ) ?? []
                        }
                        getOptionLabel={(option) => option.name ?? ""}
                        isOptionEqualToValue={(option, value) => {
                          if (field.name === "discount") {
                            return option.id === value.id;
                          } else {
                            return option.name === value;
                          }
                        }}
                        value={dropdownValue(field.section_name, field.name)}
                        onChange={(event, selectedValue) => {
                          if (selectedValue) {
                            // Add a null check
                            handleOnChange(
                              field.section_name,
                              field.name,
                              field.name === "discount"
                                ? selectedValue.id
                                : selectedValue.name,
                              field.datatype
                            );
                          }
                        }}
                      />
                    ) : null}

                    {field.is_date_field ? (
                      <MaterialDateInput
                        disableFuture
                        disabled={props.disabled}
                        required={field.is_required}
                        colorTheme={"black"}
                        size="small"
                        value={formStateFieldValue(
                          field.section_name,
                          field.name
                        ).toString()}
                        placeholder={field.field_name}
                        onChange={(selectedDate: Date | null) =>
                          handleOnChange(
                            field.section_name,
                            field.name,
                            selectedDate,
                            field.datatype
                          )
                        }
                      />
                    ) : null}
                  </>
                ) : (
                  <MaterialInput
                    fullWidth
                    disabled={textFieldDisable(field.name)}
                    size="small"
                    name={field.name}
                    colorTheme={"black"}
                    is_required={field.is_required}
                    value={formStateFieldValue(
                      field.section_name,
                      field.name
                    ).toString()}
                    placeholder={field.field_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleOnChange(
                        field.section_name,
                        event.target.name,
                        event.target.value,
                        field.datatype
                      )
                    }
                  />
                )}
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </>
  );
}
