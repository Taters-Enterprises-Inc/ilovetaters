import { IoMdClose } from "react-icons/io";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AiFillUnlock } from "react-icons/ai";
import { MobileLoginSignIn, MobileLoginSignUp } from "../components";
import {
  resetSignInMobileUser,
  selectSignInMobileUser,
  SignInMobileUserState,
} from "../slices/sign-in-mobile-user.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession } from "../slices/get-session.slice";

interface MobileLoginModalProps {
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

export function MobileLoginModal(props: MobileLoginModalProps) {
  const [value, setValue] = useState(0);
  const signInMobileUserState = useAppSelector(selectSignInMobileUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (signInMobileUserState.status === SignInMobileUserState.success) {
      props.onClose();
      dispatch(getSession());
      dispatch(resetSignInMobileUser());
    }
  }, [signInMobileUserState, dispatch, props]);

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
      <div
        style={{ display: props.open ? "flex" : "none" }}
        className="fixed inset-0 z-30 flex items-center justify-center bg-secondary bg-opacity-30 backdrop-blur-sm "
      >
        <div className="bg-secondary font-['Roboto'] p-6 px-6  text-sm text-center rounded-3xl w-[90%] sm:w-[350px] relative shadow-md shadow-tertiary">
          <div className="pb-8">
            <button
              className="float-right text-xl text-white mb-1.5"
              onClick={props.onClose}
            >
              <IoMdClose />
            </button>

            <Tabs value={value} onChange={handleChange}>
              <Tab
                icon={<AiFillUnlock />}
                iconPosition="start"
                label="Sign In"
                {...a11yProps(0)}
              />
              <Tab
                icon={<FaUser />}
                iconPosition="start"
                label="Sign Up"
                {...a11yProps(1)}
              />
            </Tabs>
          </div>

          <TabPanel value={value} index={0}>
            <MobileLoginSignIn />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MobileLoginSignUp />
          </TabPanel>
        </div>
      </div>
    </>
  );
}
