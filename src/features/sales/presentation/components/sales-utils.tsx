import { SalesActiveFieldsModel } from "features/sales/core/domain/active-fields.model";
import { SalesFormDataModel } from "features/sales/core/domain/sales-form-data.model";
import { SubmitFormParam } from "features/sales/core/sales.param";

interface UpdateFormStateParams {
  sectionName: string;
  fieldName: string;
  val: string | Date | null;
}

export const test = () => {};

export const initialFormState = (
  salesActiveFieldsState: SalesActiveFieldsModel | undefined,
  getSalesFormDataState: SalesFormDataModel[] | undefined
) => {
  const initialFormState: SubmitFormParam["formState"] = {};

  salesActiveFieldsState?.field_data.map(
    (
      field_data: { field: any[]; section: string | number },
      sectionIndex: number
    ) => {
      const sectionData: {
        [fieldName: string]: { value: string | Date | null };
      } = {};

      field_data.field.map((fields: { field_data: any[] }) => {
        fields.field_data.map(
          (field: { name: string | number }, fieldIndex: string | number) => {
            sectionData[field.name] = {
              value:
                getSalesFormDataState?.[sectionIndex]?.fieldData?.[
                  field.name
                ] ?? null,
            };
          }
        );
      });

      initialFormState[field_data.section] = sectionData;
    }
  );

  return initialFormState;
};

const shifts = [{ name: "AM" }, { name: "PM" }];

export const getEmptyRequiredFields = (
  salesActiveFieldState: SalesActiveFieldsModel,
  activeStep: number,
  formState: SubmitFormParam["formState"] | undefined
) => {
  const currentStepFields =
    salesActiveFieldState?.field_data[activeStep]?.field;
  const emptyRequiredFields: string[] = [];

  if (currentStepFields) {
    currentStepFields.forEach((subSection) => {
      subSection.field_data.forEach((field) => {
        const fieldValue = formState?.[field.section_name]?.[field.name]?.value;
        const isFieldEmpty =
          field.is_required &&
          (!fieldValue || fieldValue.toString().trim() === "");

        if (isFieldEmpty) {
          emptyRequiredFields.push(field.field_name);
        }
      });
    });
  }

  return emptyRequiredFields;
};

export const incorrectForm = (
  salesActiveFieldState: SalesActiveFieldsModel | undefined,
  formState: SubmitFormParam["formState"],
  salesFormDataState: SalesFormDataModel[] | undefined
) => {
  let result = false;

  salesActiveFieldState?.field_data.some((field_data, sectionIndex) => {
    return field_data.field.some((fields) => {
      return fields.field_data.some((field) => {
        if (
          formState?.[field_data.section]?.[field.name]?.value !==
          salesFormDataState?.[sectionIndex]?.fieldData?.[field.name]
        ) {
          result = true;

          return true;
        } else {
          result = false;
        }
      });
    });
  });

  return result;
};

export const setDynamicOption = (
  getSalesActiveFieldsState: SalesActiveFieldsModel | undefined,
  name: string
) => {
  switch (name) {
    case "shift":
      return shifts;
    case "store":
      return getSalesActiveFieldsState?.list_of_stores;
    case "discount":
      return getSalesActiveFieldsState?.discount_type;
    case "originating_store":
      return getSalesActiveFieldsState?.list_of_stores;
  }

  return null;
};

export const updateFormState = (
  prevData: SubmitFormParam["formState"] | undefined,
  { sectionName, fieldName, val }: UpdateFormStateParams
): SubmitFormParam["formState"] => {
  if (!prevData) {
    return {
      [sectionName]: {
        [fieldName]: { value: val },
      },
    };
  }
  return {
    ...prevData,
    [sectionName]: {
      ...prevData[sectionName],
      [fieldName]: { value: val },
    },
  };
};
