import { useAppSelector } from "features/config/hooks";
import { selectGetEmployeeInfo } from "../slices/get-employee-info.slice";
import { MaterialInput } from "features/shared/presentation/components/material-input";

export function HrEmployeeInfoJobDetails() {
  const getEmployeeInfoState = useAppSelector(selectGetEmployeeInfo);

  return (
    <>
      <div className="flex flex-col overflow-y-auto pb-8">
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Hiring Date"
          name="hiring_date"
          defaultValue={
            getEmployeeInfoState.data?.user_job_details?.hiring_date
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Tenure"
          name="tenure"
          defaultValue={getEmployeeInfoState.data?.user_job_details?.tenure}
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Company"
          name="company"
          defaultValue={getEmployeeInfoState.data?.user_job_details?.company}
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Department"
          name="department"
          defaultValue={getEmployeeInfoState.data?.user_job_details?.department}
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Position"
          name="position"
          defaultValue={getEmployeeInfoState.data?.user_job_details?.position}
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Employee Status"
          name="position"
          defaultValue={
            getEmployeeInfoState.data?.user_job_details?.employee_status
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
      </div>
    </>
  );
}
