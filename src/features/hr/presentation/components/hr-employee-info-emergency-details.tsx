import { useAppSelector } from "features/config/hooks";
import { selectGetEmployeeInfo } from "../slices/get-employee-info.slice";
import { MaterialInput } from "features/shared/presentation/components/material-input";

export function HrEmployeeInfoEmergencyDetails() {
  const getEmployeeInfoState = useAppSelector(selectGetEmployeeInfo);

  return (
    <>
      <div className="flex flex-col overflow-y-auto pb-8">
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Emergency Contact Person"
          name="emergency_contact_person"
          defaultValue={
            getEmployeeInfoState.data?.user_emergency_details
              ?.emergency_contact_person
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Contact Info"
          name="contact_info"
          defaultValue={
            getEmployeeInfoState.data?.user_emergency_details?.contact_info
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Emergency Contact Relationship"
          name="emergency_contact_relationship"
          defaultValue={
            getEmployeeInfoState.data?.user_emergency_details
              ?.emergency_contact_relationship
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Any Health Problem"
          name="any_health_problem"
          defaultValue={
            getEmployeeInfoState.data?.user_emergency_details
              ?.any_health_problem
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
        <MaterialInput
          onChange={() => {}}
          colorTheme="black"
          required
          label="Blood Type"
          name="blood_type"
          defaultValue={
            getEmployeeInfoState.data?.user_emergency_details?.blood_type
          }
          style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}
        />
      </div>
    </>
  );
}
