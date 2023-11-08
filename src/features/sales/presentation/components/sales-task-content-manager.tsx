import { Tabs, Tab, Box } from "@mui/material";
import { SALES_TAB_NAVIGATION_MANAGER } from "features/shared/constants";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function SalesTaskContentManager() {
  const [tabValue, setTabValue] = useState("0");

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <div className="w-full">
      <Tabs
        value={Number(tabValue)}
        onChange={handleChange}
        scrollButtons="auto"
        allowScrollButtonsMobile
        variant="scrollable"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#a21013",
          },
        }}
      >
        {SALES_TAB_NAVIGATION_MANAGER.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{ color: "gray", fontWeight: 600, fontSize: 15 }}
          />
        ))}
      </Tabs>

      <TabPanel index={Number(tabValue)} value={Number(tabValue)}>
        test
      </TabPanel>
    </div>
  );
}
