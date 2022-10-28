import { IoMdClose } from "react-icons/io";
import { MdPolicy, MdRule } from "react-icons/md";
import { GoLaw } from "react-icons/go";

import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import styled from "@mui/material/styles/styled";
import useMediaQuery from '@mui/material/useMediaQuery';

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";

import { TermsAndCondition } from "../components/terms-and-condition";
import { ReturnPolicy } from "../components/return-policy";
import { PrivacyPolicy } from '../components/privacy-policy';

  const StyledTabs = styled((props: TabsProps) => <Tabs {...props} />)(
    ({ theme }) => ({

        "& .MuiTabs-indicator": {
          backgroundColor: "#22201A",
          height: 3,
        },

        "& .MuiTab-root.Mui-selected": {
          fontWeight: 'bold',
        },

        "& .MuiTabs-flexContainerVertical": {
          height: 150,
          justifyContent: "space-between",
          alignItems: "center",
        },

        "& .MuiButtonBase-root": { 
          minHeight: "50px"
        }, 
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
  var width = useMediaQuery("(max-width:640px)");

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
            <div className="md:w-[80%] w-[90%] bg-paper sm:h-[600px] h-[700px] my-auto add-extra-margin text-secondary rounded-3xl block">
                <button
                    className="absolute sm:text-2xl text-xl text-black mt-auto pt-[12px] md:right-[11vw] right-[6vw]"
                    onClick={() => {
                        document.body.classList.remove("overflow-hidden");
                        props.onClose();
                    }}
                    >
                    <IoMdClose />
                </button>

                <StyledTabs value={value} onChange={handleChange} className="sm:w-[90%] w-[85%] mx-auto mb-6" orientation={ width ? "vertical" : "horizontal"} >
                    <Tab
                        icon={<MdRule />}
                        iconPosition="start"
                        label="Terms and Conditions"
                        {...a11yProps(0)}
                        className="sm:w-[33.33%] w-[100%]"
                    />
                    <Tab
                        icon={<MdPolicy />}
                        iconPosition="start"
                        label="Privacy Policy"
                        {...a11yProps(1)}
                        className="sm:w-[33.33%] w-[100%]"
                    />
                    <Tab
                        icon={<GoLaw />}
                        iconPosition="start"
                        label="Return Policy"
                        {...a11yProps(2)}
                        className="sm:w-[33.33%] w-[100%]"
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
