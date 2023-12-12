import { IoMdClose } from "react-icons/io";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, SyntheticEvent, useEffect } from "react";
import {
  HrEmployeeInfoContactDetails,
  HrEmployeeInfoEmergencyDetails,
  HrEmployeeInfoJobDetails,
  HrEmployeeInfoOtherDetails,
  HrEmployeeInfoPersonalDetails,
  HrEmployeeInfoSalaryDetails,
  HrEmployeeInfoTerminationDetails,
} from "../components";
import { useAppSelector } from "features/config/hooks";
import { selectGetEmployeeInfo } from "../slices/get-employee-info.slice";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    "aria-controls": `admin-tabpanel-${index}`,
  };
}

interface AdminShopOrdersModalProps {
  open: boolean;
  onClose: () => void;
}

export function HrEmployeeInfoModal(props: AdminShopOrdersModalProps) {
  const getEmployeeInfoState = useAppSelector(selectGetEmployeeInfo);

  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
  }, [getEmployeeInfoState]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">Employee Information</span>
          <button
            className="text-2xl text-white"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="px-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
          <Tabs value={value} onChange={handleChange} variant="scrollable">
            {getEmployeeInfoState.data?.user_personal_details ? (
              <Tab label="Personal Details" {...a11yProps(0)} />
            ) : null}
            {getEmployeeInfoState.data?.user_job_details ? (
              <Tab label="Job Details" {...a11yProps(1)} />
            ) : null}
            {getEmployeeInfoState.data?.user_contact_details ? (
              <Tab label="Contact Details" {...a11yProps(2)} />
            ) : null}
            {getEmployeeInfoState.data?.user_emergency_details ? (
              <Tab label="Emergency Details" {...a11yProps(3)} />
            ) : null}
            {getEmployeeInfoState.data?.user_salary_details ? (
              <Tab label="Salary Details" {...a11yProps(4)} />
            ) : null}
            {getEmployeeInfoState.data?.user_termination_details ? (
              <Tab label="Termination Details" {...a11yProps(5)} />
            ) : null}
            {getEmployeeInfoState.data?.user_other_details ? (
              <Tab label="Other Details" {...a11yProps(6)} />
            ) : null}
          </Tabs>
          <hr />
          <TabPanel value={value} index={0}>
            <HrEmployeeInfoPersonalDetails />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HrEmployeeInfoJobDetails />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <HrEmployeeInfoContactDetails />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <HrEmployeeInfoEmergencyDetails />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <HrEmployeeInfoSalaryDetails />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <HrEmployeeInfoTerminationDetails />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <HrEmployeeInfoOtherDetails />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
