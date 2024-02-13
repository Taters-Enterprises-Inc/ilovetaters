import { Badge, BadgeProps, Box, Typography, styled } from "@mui/material";
import { SalesActiveFieldsModel } from "features/sales/core/domain/active-fields.model";
import { SalesFormDataModel } from "features/sales/core/domain/sales-form-data.model";
import { SubmitFormParam } from "features/sales/core/sales.param";

interface UpdateFormStateParams {
  sectionName: string;
  fieldName: string;
  val: StoreInfo | string | Date | null;
}

interface StoreInfo {
  name: string;
  store_id: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const test = () => {};

export const fieldToHide = [
  "entry_date",
  "store",
  "shift",
  "cashier_name",
  "email",
  "transaction_date",
];

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
  salesActiveFieldState: SalesActiveFieldsModel | undefined,
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

export const updateEntryStoreShift = (
  prevData: SubmitFormParam["formState"] | undefined
) => {
  if (prevData) {
    return {
      ...prevData,
      "General Information": {
        ...prevData["General Information"],
        entry_date: { value: null },
        store: { value: "" },
        store_id: { value: "" },
        shift: { value: "" },
      },
    };
  }
};

export const updateFormState = (
  prevData: SubmitFormParam["formState"] | undefined,
  { sectionName, fieldName, val }: UpdateFormStateParams
): SubmitFormParam["formState"] => {
  if (!prevData) {
    if (fieldName === "store") {
      return {
        [sectionName]: {
          [fieldName]: { value: (val as StoreInfo).name },
          store_id: { value: (val as StoreInfo).store_id },
        },
      };
    } else {
      return {
        [sectionName]: {
          [fieldName]: { value: val as string | Date | null },
        },
      };
    }
  }
  if (fieldName === "store") {
    return {
      ...prevData,
      [sectionName]: {
        ...prevData[sectionName],
        [fieldName]: { value: (val as StoreInfo).name },
        store_id: { value: (val as StoreInfo).store_id },
      },
    };
  } else {
    return {
      ...prevData,
      [sectionName]: {
        ...prevData[sectionName],
        [fieldName]: { value: val as string | Date | null },
      },
    };
  }
};

export const formatDate = (inputDate: Date | string) => {
  const formattedDate = new Date(inputDate).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Manila",
  });
  return formattedDate.replace(/,/g, "");
};

export function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div className="w-full">
      {value === index && <div className="p-3 w-full">{children}</div>}
    </div>
  );
}

export const hideField = (
  fieldName: string,
  selectedFieldName: string[] | undefined
) => {
  return selectedFieldName?.some((field) => field === fieldName);
};

export const hidePanel = (type: string | null) => {
  let cashier = false;
  let tc = false;
  let manager = false;

  if (type === "cashier") {
    cashier = false;
    tc = true;
    manager = true;
  } else if (type === "tc") {
    cashier = false;
    tc = false;
    manager = true;
  }

  return { cashier: cashier, tc: tc, manager: manager };
};

export const getFormState = (
  userType: string | null,
  cashierFormState: SubmitFormParam["formState"] | undefined,
  tcFormState: SubmitFormParam["formState"] | undefined,
  managerFormState: SubmitFormParam["formState"] | undefined
) => {
  switch (userType) {
    case "cashier":
      return cashierFormState ?? {};
    case "tc":
      return tcFormState ?? {};
    case "manager":
      return managerFormState ?? {};
    default:
      return {};
  }
};

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: -13,
    border: `2px solid #ffcd17`,
    backgroundColor: "#ffcd17",
    padding: "0 4px",
  },
}));
