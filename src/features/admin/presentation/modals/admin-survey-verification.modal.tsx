import { IoMdClose } from "react-icons/io";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, SyntheticEvent } from "react";
import { AdminIdUserDiscountInformation } from "../components";

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

interface AdminUserDiscountModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSurveyVerificationModal(
  props: AdminUserDiscountModalProps
) {
  const [value, setValue] = useState(0);

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
          <span className="text-2xl text-white">Survey Verification Form</span>
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
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            aria-label="basic tabs example"
          >
            <Tab label="ID Information" {...a11yProps(0)} />
          </Tabs>
          <hr />
          <TabPanel value={value} index={0}>
            <AdminIdUserDiscountInformation onClose={props.onClose} />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
