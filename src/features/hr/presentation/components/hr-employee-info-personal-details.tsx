import { useAppSelector } from "features/config/hooks";
import { selectGetEmployeeInfo } from "../slices/get-employee-info.slice";
import { MaterialInput } from "features/shared/presentation/components/material-input";
import { FaCircleUser } from "react-icons/fa6";

export function HrEmployeeInfoPersonalDetails() {
  const getEmployeeInfoState = useAppSelector(selectGetEmployeeInfo);

  return (
    <>
      <div className="flex flex-col overflow-y-auto py-8">
        <FaCircleUser size={200} className="ml-8" />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Name"
          name="name"
          defaultValue={
            getEmployeeInfoState.data?.user_personal_details?.first_name +
            " " +
            getEmployeeInfoState.data?.user_personal_details?.last_name
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Gender"
          name="gender"
          defaultValue={
            getEmployeeInfoState.data?.user_personal_details?.gender
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Date of Birth"
          name="date_of_birth"
          defaultValue={
            getEmployeeInfoState.data?.user_personal_details?.date_of_birth
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Education"
          name="education"
          defaultValue={
            getEmployeeInfoState.data?.user_personal_details?.education
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Marital Status"
          name="marital_status"
          defaultValue={
            getEmployeeInfoState.data?.user_personal_details?.marital_status
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="SSS#"
          name="sss_no"
          defaultValue={
            getEmployeeInfoState.data?.user_personal_details?.sss_no
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="TIN"
          name="tin_no"
          defaultValue={
            getEmployeeInfoState.data?.user_personal_details?.tin_no
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="PhilHealth"
          name="phil_health"
          defaultValue={
            getEmployeeInfoState.data?.user_personal_details?.philhealth_no
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Pag-ibig"
          name="pag_ibig_no"
          defaultValue={
            getEmployeeInfoState.data?.user_personal_details?.pagibig_no
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
      </div>
    </>
  );
}
