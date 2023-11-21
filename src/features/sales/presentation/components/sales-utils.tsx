import { SalesActiveFieldsModel } from "features/sales/core/domain/active-fields.model";
import { SubmitFormParam } from "features/sales/core/sales.param";

export const test = () => {};

export const initialFormState = (
  salesActiveFieldsState: SalesActiveFieldsModel | undefined,
  sampleData: any
) => {
  const initialFormState: SubmitFormParam["formState"] = {};

  salesActiveFieldsState?.field_data.map(
    (
      field_data: { field: any[]; section: string | number },
      sectionIndex: string | number
    ) => {
      const sectionData: {
        [fieldName: string]: { value: string | Date | null };
      } = {};

      field_data.field.map((fields: { field_data: any[] }) => {
        fields.field_data.map(
          (field: { name: string | number }, fieldIndex: string | number) => {
            sectionData[field.name] = {
              value:
                sampleData.data[sectionIndex]?.fieldValues[fieldIndex]?.value ??
                undefined,
            };
          }
        );
      });

      initialFormState[field_data.section] = sectionData;
    }
  );

  return initialFormState;
};

export const setDynamicOption = (
  getSalesActiveFieldsState: SalesActiveFieldsModel | undefined,
  name: string
) => {
  switch (name) {
    case "shift":
      return ["AM", "PM"];

    case "store":
      return getSalesActiveFieldsState?.list_of_stores.map(
        (store) => store.name
      );

    case "discount":
      return getSalesActiveFieldsState?.discount_type.map(
        (discount) => discount.name
      );

    case "gcOriginatingStore":
      return getSalesActiveFieldsState?.list_of_stores.map(
        (store) => store.name
      );
  }

  return null;
};
