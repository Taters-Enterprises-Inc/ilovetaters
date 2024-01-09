import { useAppSelector } from "features/config/hooks";
import { selectGetEmployeeInfo } from "../slices/get-employee-info.slice";
import { MaterialInput } from "features/shared/presentation/components/material-input";

export function HrEmployeeInfoOtherDetails() {
  const getEmployeeInfoState = useAppSelector(selectGetEmployeeInfo);

  return (
    <>
      <div className="flex flex-col overflow-y-auto pb-8">
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Details"
          name="details"
          defaultValue={getEmployeeInfoState.data?.user_other_details?.detail}
          style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}
        />
      </div>
    </>
  );
}
