import { IoMdClose } from "react-icons/io";
import { MdPolicy, MdRule } from "react-icons/md";
import { GoLaw } from "react-icons/go";

import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import styled from "@mui/material/styles/styled";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";

import { TermsAndCondition } from "../components/terms-and-condition";
import { ReturnPolicy } from "../components/return-policy";
import { PrivacyPolicy } from '../components/privacy-policy';

  const StyledTabs = styled((props: TabsProps) => <Tabs {...props} />)(
    ({ theme }) => ({
      height: 60,
      "& .MuiTabs-indicator": {
        backgroundColor: "#22201A",
        height: 3,
      },
      "& .MuiTab-root.Mui-selected": {
        fontWeight: 'bold',
      },
    })
  );
  
  const StyledTab = styled((props: TabProps) => <Tab {...props} />)(
    ({ theme }) => ({
      color: "black",
      height: 60,
    })
  );

  interface TermsAndPolicyModalProps {
    open: boolean;
    onClose: () => void;
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  }

export function TermsAndPolicyModal( props:TermsAndPolicyModalProps ) {

  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
        <div style={{ display: props.open ? "flex" : "none" }}
            className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm no-scrollbar no-scrollbar::-webkit-scrollbar"
        >
            <div className="w-[80%] bg-paper h-auto text-secondary mt-[4%] mb-[2%] rounded-3xl">
                <button
                    className="absolute text-2xl text-black top-[12vh] right-[11vw]"
                    onClick={() => {
                        document.body.classList.remove("overflow-hidden");
                        props.onClose();
                    }}
                    >
                    <IoMdClose />
                </button>

                <StyledTabs value={value} onChange={handleChange} className="w-[90%] mx-auto">
                    <StyledTab
                        icon={<MdRule />}
                        iconPosition="start"
                        label="Terms and Conditions"
                        {...a11yProps(0)}
                        className="text-secondary flex w-[33.33%] font-semibold active space-x-2 items-center 
                        text-base text-start py-2 lg:py-4 lg:px-6 bg-paper"
                    />
                    <StyledTab
                        icon={<MdPolicy />}
                        iconPosition="start"
                        label="Privacy Policy"
                        {...a11yProps(1)}
                        className="text-secondary flex w-[33.33%]  font-semibold space-x-2 items-center 
                        text-base text-start py-2 lg:py-4 lg:px-6 bg-paper"
                    />
                    <StyledTab
                        icon={<GoLaw />}
                        iconPosition="start"
                        label="Return Policy"
                        {...a11yProps(2)}
                        className="text-secondary flex w-[33.33%]  font-semibold space-x-2 items-center 
                        text-base text-start py-2 lg:py-4 lg:px-6 bg-paper"
                    />
                </StyledTabs>

                <TabPanel value={value} index={0}>
                    <TermsAndCondition />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PrivacyPolicy />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ReturnPolicy />
                </TabPanel>
            </div>
        </div>
    </>
  );
}
