import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getInfluencer,
  selectGetInfluencer,
} from "../slices/get-influencer.slice";
import NumberFormat from "react-number-format";
import { ProfileCashoutModal } from "../modals";
import { influencerCashout } from "../slices/influencer-cashout.slice";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { ProfileInfluencerReferees } from "./profile-influencer-referees";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import styled from "@mui/material/styles/styled";
import { BsFillPeopleFill, BsCashCoin } from "react-icons/bs";
import { ProfileInfluencerCashouts } from "./profile-influencer-cashouts";

const StyledTabs = styled((props: TabsProps) => <Tabs {...props} />)(
  ({ theme }) => ({
    height: 60,
    "& .MuiTabs-indicator": {
      backgroundColor: "#a21013",
      height: 3,
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#a21013",
    },
  })
);

const StyledTab = styled((props: TabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    color: "#22201A",
    height: 60,
  })
);

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

export function ProfileInfluencerDashboard() {
  const dispatch = useAppDispatch();

  const getInfluencerState = useAppSelector(selectGetInfluencer);

  const [openCashoutModal, setOpenCashoutModal] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getInfluencer());
  }, [dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="flex">
        {getInfluencerState.data ? (
          <div
            onClick={() => {
              setOpenCashoutModal(true);
            }}
            className="flex cursor-pointer lg:shadow-[0_3px_10px_rgb(0,0,0,0.3)] w-[350px]"
          >
            <div className="bg-primary w-[4px]"></div>
            <div className="px-4 py-1 flex flex-col flex-1">
              <span className="text-lg text-secondary font-semibold">
                INFLUENCER BALANCE
              </span>
              <span className="text-xs text-secondary mt-1">
                {getInfluencerState.data.first_name +
                  " " +
                  getInfluencerState.data.middle_name +
                  " " +
                  getInfluencerState.data.last_name}
              </span>
              <div className="h-[40px] flex justify-end items-end">
                <span className="text-[12px] font-semibold text-secondary mr-2 mb-[3px]">
                  PHP
                </span>
                <span className="text-2xl font-bold text-secondary">
                  {getInfluencerState.data.payable ? (
                    <NumberFormat
                      value={parseFloat(getInfluencerState.data.payable)}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  ) : (
                    "0"
                  )}
                </span>
                <span className="text-[12px] font-semibold text-secondary mr-2 mb-[3px]">
                  .
                  {getInfluencerState.data.payable
                    ? parseFloat(getInfluencerState.data.payable)
                        .toFixed(2)
                        .split(".")[1]
                    : 0}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <StyledTabs value={value} onChange={handleChange}>
        <StyledTab
          icon={<BsFillPeopleFill />}
          iconPosition="start"
          label="Referees"
          {...a11yProps(0)}
        />
        <StyledTab
          icon={<BsCashCoin />}
          iconPosition="start"
          label="Cashout History"
          {...a11yProps(1)}
        />
      </StyledTabs>

      <TabPanel value={value} index={0}>
        <ProfileInfluencerReferees />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfileInfluencerCashouts />
      </TabPanel>
      <ProfileCashoutModal
        open={openCashoutModal}
        onClose={() => {
          setOpenCashoutModal(false);
        }}
        onCashout={(cashout) => {
          if (getInfluencerState.data) {
            if (
              getInfluencerState.data.payable &&
              parseFloat(cashout) <= parseFloat(getInfluencerState.data.payable)
            ) {
              dispatch(
                influencerCashout({
                  influencerId: getInfluencerState.data.id,
                  cashout,
                })
              );
              setOpenCashoutModal(false);
            } else {
              dispatch(
                popUpSnackBar({
                  message: "You can't cashout above your balance.",
                  severity: "error",
                })
              );
            }
          }
        }}
      />
    </>
  );
}
