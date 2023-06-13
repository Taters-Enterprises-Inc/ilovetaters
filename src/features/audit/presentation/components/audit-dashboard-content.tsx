import { Autocomplete, Tab, Tabs, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect, useState } from "react";
import { getStores, selectGetStores } from "../slices/get-stores.slice";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getAuditStoreResult,
  selectGetAuditStoreResult,
} from "../slices/audit-store-result";
import { get } from "http";
import { getAuditResponse } from "../slices/get-audit-response.slice";
import { format } from "date-fns";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function AuditDashboardContent() {
  const [value, setValue] = useState(0);
  const getStoreState = useAppSelector(selectGetStores);
  const getStoreResultState = useAppSelector(selectGetAuditStoreResult);
  const dispatch = useAppDispatch();

  const [selectedStore, setSelectedStore] = useState<
    | {
        id: string;
        mall_type: string;
        store_code: string;
        store_name: string;
        store_type_id: string;
        type_name: string;
      }
    | undefined
  >();

  const [selectedSingle, setSelectedSingle] = useState("");

  useEffect(() => {
    dispatch(getStores());
    dispatch(getAuditStoreResult(""));
  }, [dispatch]);

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
          <div className="p-3">
            <span>{children}</span>
          </div>
        )}
      </div>
    );
  };

  const data = [
    { category: "category1", ["key"]: 91, target: 90 },
    { category: "category2", ["key"]: 79, target: 90 },
    { category: "category3", ["key"]: 78, target: 90 },
    { category: "category4", ["key"]: 76, target: 90 },
    { category: "category5", ["key"]: 76, target: 90 },
    { category: "category6", ["key"]: 74, target: 90 },
    { category: "category7", ["key"]: 38, target: 90 },
    { category: "category8", ["key"]: 11, target: 90 },
  ];

  return (
    <>
      <div className="p-12">
        <div className="flex flex-col space-y-10 h-screen">
          <div className="flex justify-start">
            <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900">
              Internal Quality Audit Dashboard
            </h5>
          </div>
          <div className="flex flex-col space-y-4 px-10 w-full">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              options={
                getStoreState.data
                  ? getStoreState.data.stores.map((row) => row.store_name)
                  : []
              }
              onChange={(event, value: any) => {
                if (value && getStoreState.data) {
                  const selectedStoreObj = getStoreState.data.stores.find(
                    (store) => store.store_name === value
                  );
                  setSelectedStore(selectedStoreObj);
                } else {
                  setSelectedStore(undefined);
                }
              }}
              renderInput={(params) => (
                <TextField
                  value={selectedStore ?? ""}
                  {...params}
                  label="Select store to evaluate"
                />
              )}
            />

            {selectedStore ? (
              <>
                <div className="flex flex-col space-y-5 border border-primary border-t-8 rounded-t-lg">
                  <span className="bg-primary p-2 text-white">
                    Store Information & Previous Audit
                  </span>
                  <div className="flex flex-col  px-2">
                    <div>
                      <span className="font-medium">Store Name: </span>
                      <span>{selectedStore.store_name}</span>
                    </div>
                    <div>
                      <span className="font-medium">Store Code: </span>
                      <span>{selectedStore.store_code}</span>
                    </div>
                    <div>
                      <span className="font-medium">ownership Type: </span>
                      <span>{selectedStore.mall_type}</span>
                    </div>
                    <div>
                      <span className="font-medium">Mall Type: </span>
                      <span>{selectedStore.type_name}</span>
                    </div>
                  </div>
                </div>

                {getStoreResultState.data ? (
                  <div className="flex flex-col border border-primary border-t-8 rounded-t-lg">
                    <span className="bg-primary p-2 text-white">
                      Comparative
                    </span>
                    <div className="px-20 py-10 space-y-10">
                      <div className="flex flex-col space-y-2">
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          size="small"
                          options={
                            getStoreResultState.data
                              ? Object.keys(getStoreResultState.data).map(
                                  (dateString) =>
                                    new Date(dateString)
                                      .toLocaleString("default", {
                                        month: "long",
                                        year: "numeric",
                                      })
                                      .replace(",", "")
                                )
                              : []
                          }
                          onChange={(event, value: any) => {
                            if (value) {
                              const selectedPeriodObj = value;
                              setSelectedSingle(selectedPeriodObj);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              value={selectedStore ?? ""}
                              {...params}
                              label="Select Audit Period"
                            />
                          )}
                        />
                        <span className="flex justify-center text-lg font-medium">
                          {selectedStore.store_name} Comparative Audit Score per
                          Category {"(Audit Period | Need to change)"}
                        </span>

                        <ResponsiveContainer
                          className="border-2 border-gray-300 rounded-lg"
                          width="100%"
                          height={300}
                        >
                          <ComposedChart
                            width={730}
                            height={250}
                            data={
                              Object.values(getStoreResultState.data)?.[
                                selectedSingle
                                  ? Object.keys(
                                      getStoreResultState.data
                                    ).indexOf(
                                      format(
                                        new Date(selectedSingle),
                                        "yyyy-MM-dd"
                                      )
                                    )
                                  : -1
                              ] ?? []
                            }
                          >
                            <XAxis dataKey="category_name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar
                              dataKey="grade"
                              name={selectedSingle}
                              barSize={10}
                              fill="#413ea0"
                            />
                            <Line
                              type="monotone"
                              dataKey="target"
                              stroke="#ff7300"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                      <div>
                        <div className="flex flex-col space-y-3">
                          <div className="flex flex-col font-medium">
                            <span className="flex justify-center text-lg">
                              Comparative Audit Score per Category
                            </span>
                            <span className="flex justify-center text-sm">
                              need to change
                            </span>
                          </div>
                          <div className="flex space-x-5">
                            <Autocomplete
                              fullWidth
                              disablePortal
                              id="combo-box-demo"
                              size="small"
                              options={
                                getStoreResultState.data
                                  ? Object.keys(getStoreResultState.data).map(
                                      (dateString) =>
                                        new Date(dateString)
                                          .toLocaleString("default", {
                                            month: "long",
                                            year: "numeric",
                                          })
                                          .replace(",", "")
                                    )
                                  : []
                              }
                              renderInput={(params) => (
                                <TextField
                                  value={selectedStore ?? ""}
                                  {...params}
                                  label="Select Audit Period"
                                />
                              )}
                            />
                          </div>
                          <div>
                            <ResponsiveContainer
                              className="border-2 border-gray-300 rounded-lg"
                              width="100%"
                              height={300}
                            >
                              <ComposedChart
                                width={730}
                                height={250}
                                data={data}
                              >
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                {/* map over per category */}
                                <Bar
                                  dataKey="key"
                                  barSize={20}
                                  fill="#413ea0"
                                />
                                <Line
                                  type="monotone"
                                  dataKey="target"
                                  stroke="#ff7300"
                                />
                              </ComposedChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-col border border-primary border-t-8 rounded-t-lg">
                  <Tabs
                    className="bg-primary text-white"
                    value={value}
                    onChange={(
                      event: React.SyntheticEvent,
                      newValue: number
                    ) => {
                      setValue(newValue);
                    }}
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    <Tab
                      label="Recurring Deviation"
                      style={{
                        color: "white",
                      }}
                    />
                    <Tab
                      label="Critical Deviation"
                      style={{
                        color: "white",
                      }}
                    />
                  </Tabs>

                  <TabPanel value={value} index={0}>
                    Recurring Deviation "To be Updated Previous Audit"
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Critical Deviation "To be Updated Previous Audit"
                  </TabPanel>
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <span>Select Store to preview Data</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
