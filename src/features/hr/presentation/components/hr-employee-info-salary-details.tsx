import { useAppSelector } from "features/config/hooks";
import { selectGetEmployeeInfo } from "../slices/get-employee-info.slice";
import { MaterialInput } from "features/shared/presentation/components/material-input";

export function HrEmployeeInfoSalaryDetails() {
  const getEmployeeInfoState = useAppSelector(selectGetEmployeeInfo);

  return (
    <>
      <div className="flex flex-col overflow-y-auto pb-8">
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Initial Salary"
          name="initial_salary"
          defaultValue={getEmployeeInfoState.data?.user_salary_details?.initial_salary.toString()}
          style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Current Salary"
          name="current_salary"
          defaultValue={getEmployeeInfoState.data?.user_salary_details?.current_salary.toString()}
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Bank Account"
          name="bank_account"
          defaultValue={
            getEmployeeInfoState.data?.user_salary_details?.bank_account_no
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
      </div>
    </>
  );
}
