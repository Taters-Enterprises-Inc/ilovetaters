import {
  Box,
  Divider,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import {
  GetAuditResponseState,
  getAuditResponse,
  selectGetAuditResponse,
} from "../slices/get-audit-response.slice";
import { AppDispatch } from "features/config/store";
import { useAppSelector } from "features/config/hooks";
import { AuditResultModel } from "features/audit/core/domain/audit-result.model";
import { closestIndexTo } from "date-fns/esm";
import { get } from "http";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function AuditReviewContent() {
  const { hash } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const getResponseState = useAppSelector(selectGetAuditResponse);

  const [result, setResult] = useState<AuditResultModel>({});

  const [tabStep, setTabStep] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (hash) {
      dispatch(getAuditResponse({ hash }));
    }
  }, [hash, dispatch]);

  const auditPeriod = (dateParam: string, isPeriod: boolean) => {
    const date = new Date(`${dateParam}-01`);
    const formattedAuditPeriod = date.toLocaleDateString("en", {
      month: "long",
      year: "numeric",
    });

    const formattedDateAdded = date.toLocaleDateString("en", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });

    return isPeriod ? formattedAuditPeriod : formattedDateAdded;
  };

  const AuditResponseResultTable = [
    { name: "Category" },
    { name: "Grade" },
    { name: "Weight%" },
    { name: "Final" },
  ];

  const AuditResponseCategory = [
    { category: "Environment", id: 1 },
    { category: "Customer Service", id: 2 },
    { category: "Safety", id: 3 },
    { category: "Product Standard", id: 4 },
    { short: "Materials Mgmt.", category: "Material Management", id: 5 },
    { category: "Cash Handling", id: 6 },
    { short: "Equip. Maintenance", category: "Equipment Maintenance", id: 7 },
    { short: "Resource Mgmt.", category: "Resource Management", id: 8 },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabStep(newValue);
  };

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

  return (
    <>
      <div className="container max-w-screen-lg mb-12">
        <div className="flex flex-col space-y-5">
          <div className="flex justify-center">
            <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900">
              Internal Quality Audit Evaluation Summary
            </h5>
          </div>
          {getResponseState.data ? (
            <>
              <div className="flex flex-col space-y-2 text-lg border-t-8 border-primary shadow-2xl drop-shadow rounded-lg p-5">
                <span className="text-xl md:text-2xl font-bold tracking-tight">
                  {getResponseState.data.information.store_name}
                </span>
                <div className="space-y-2">
                  <div className="flex flex-row justify-between text-xs md:text-base">
                    <div className="space-x-1 md:space-x-2">
                      <span className="text-center">
                        {getResponseState.data.information.type_name}
                      </span>
                      <span>&#x2022;</span>
                      <span className="text-center">
                        {auditPeriod(
                          getResponseState.data.information.audit_period,
                          true
                        )}
                      </span>
                    </div>
                    <Divider
                      className="md:hidden"
                      orientation="vertical"
                      flexItem
                    />
                    <div className="space-x-1 md:space-x-2">
                      <span className="text-center">
                        By: {getResponseState.data.information.attention}
                      </span>
                      <span>&#x2022;</span>
                      <span className="text-center">
                        {auditPeriod(
                          getResponseState.data.information.dateadded,
                          false
                        )}
                      </span>
                    </div>
                  </div>
                  <Divider />

                  <div className="mt-5">
                    <div className="relative overflow-x-auto rounded-lg">
                      <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-white uppercase bg-primary">
                          <tr>
                            {AuditResponseResultTable.map((col, index) => (
                              <th key={index} scope="col" className="px-2 py-3">
                                {col.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        {getResponseState.data ? (
                          <tbody>
                            {AuditResponseCategory.map((row, index) => (
                              <tr key={index} className="bg-white">
                                <td
                                  scope="row"
                                  className="px-4 md:px-6 py-1 font-bold text-gray-900 whitespace-nowrap"
                                >
                                  {isSmallScreen && row.short
                                    ? row.short
                                    : row.category}
                                </td>
                                {getResponseState.data?.default_weight_info[
                                  index
                                ] ? (
                                  <>
                                    <td className="px-2 py-1">
                                      {`${Math.round(
                                        getResponseState.data
                                          .default_weight_info[index].grade *
                                          100
                                      )}%`}
                                    </td>
                                    <td className="px-2 py-1">
                                      {`${Math.round(
                                        getResponseState.data
                                          .default_weight_info[index].weight *
                                          100
                                      )}%`}
                                    </td>
                                    <td className="px-2 py-1">
                                      {`${Math.round(
                                        getResponseState.data
                                          .default_weight_info[index]
                                          .final_score * 100
                                      )}%`}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="px-2 py-1">-</td>
                                    <td className="px-2 py-1">-</td>
                                    <td className="px-2 py-1">-</td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        ) : (
                          <div> No data </div>
                        )}
                        <tfoot>
                          <tr className="font-semibold text-gray-900 ">
                            <th scope="row" className="px-6 py-3 text-base">
                              {isSmallScreen
                                ? "Gen Ave %"
                                : "General Average %"}
                            </th>
                            <td className="px-2 py-3">-</td>
                            {getResponseState.data.default_weight_info ? (
                              <>
                                <td className="px-2 py-3">
                                  {`${Math.round(
                                    getResponseState.data.default_weight_info.reduce(
                                      (accumulator, currentIteration) => {
                                        return (
                                          accumulator +
                                          Number(currentIteration.weight)
                                        );
                                      },
                                      0
                                    ) * 100
                                  )}%`}
                                </td>
                                <td className="px-2 py-3">
                                  {`${Math.round(
                                    getResponseState.data.default_weight_info.reduce(
                                      (accumulator, currentIteration) => {
                                        return (
                                          accumulator +
                                          Number(currentIteration.final_score)
                                        );
                                      },
                                      0
                                    ) * 100
                                  )}%`}
                                </td>
                              </>
                            ) : null}
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 text-lg border-t-8 border-primary shadow-2xl drop-shadow rounded-lg">
                <Tabs
                  className="bg-primary text-white"
                  value={tabStep}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "white",
                    },
                  }}
                >
                  {getResponseState.data.answers
                    .filter((row) => row.criteria.length !== 0)
                    .map((row, index) => (
                      <Tab
                        key={index}
                        label={row.section}
                        style={{
                          color: "white",
                        }}
                      />
                    ))}
                </Tabs>

                <TabPanel index={tabStep} value={tabStep}>
                  <>
                    <div className="flex flex-col space-y-2">
                      {getResponseState.data.answers[tabStep].criteria.map(
                        (row, index) => (
                          <div key={index} className=" p-4">
                            <div>
                              <span className="text-base md:text-lg">
                                {row.questions}
                              </span>
                              <div className="flex flex-col md:flex-row  md:space-x-2">
                                <span className="md:text-sm md:self-center text-xs">
                                  Equivalent point: {row.equivalent_point}
                                </span>
                                <span className="hidden md:block">
                                  &#x2022;
                                </span>
                                <span className="md:text-sm md:self-center text-xs">
                                  Urgency Level: {row.level}
                                </span>

                                <Divider orientation="vertical" flexItem />

                                <span className="md:text-sm md:self-center text-xs">
                                  Rating: {row.rating}
                                </span>
                                <span className="hidden md:block">
                                  &#x2022;
                                </span>
                                <span className="md:text-sm md:self-center text-xs">
                                  Remarks: {row.remarks}
                                </span>
                              </div>
                            </div>
                            <Divider />
                          </div>
                        )
                      )}
                    </div>
                  </>
                </TabPanel>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
