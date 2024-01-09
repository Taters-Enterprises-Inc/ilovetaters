import { useAppSelector } from "features/config/hooks";
import { selectGetEmployeeInfo } from "../slices/get-employee-info.slice";
import { MaterialInput } from "features/shared/presentation/components/material-input";

export function HrEmployeeInfoTerminationDetails() {
  const getEmployeeInfoState = useAppSelector(selectGetEmployeeInfo);

  return (
    <>
      <div className="flex flex-col overflow-y-auto pb-8">
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Active"
          name="active"
          defaultValue={
            getEmployeeInfoState.data?.user_termination_details?.active
              ? "Yes"
              : "No"
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Termination Date"
          name="termination_date"
          defaultValue={
            getEmployeeInfoState.data?.user_termination_details
              ?.termination_date
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Termination Reason"
          name="termination_reason"
          defaultValue={
            getEmployeeInfoState.data?.user_termination_details
              ?.termination_reason
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
      </div>
    </>
  );
}
