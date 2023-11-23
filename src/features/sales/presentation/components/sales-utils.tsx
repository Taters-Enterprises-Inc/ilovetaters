import { SalesActiveFieldsModel } from "features/sales/core/domain/active-fields.model";
import { SalesFormDataModel } from "features/sales/core/domain/sales-form-data.model";
import { SubmitFormParam } from "features/sales/core/sales.param";

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
    case "gcOriginatingStore":
      return getSalesActiveFieldsState?.list_of_stores;
  }

  return null;
};
