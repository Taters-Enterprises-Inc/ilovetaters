import {
  Autocomplete,
  Divider,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";
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
import { format, isValid } from "date-fns";
import { createQueryParams } from "features/config/helpers";
import { spawn } from "child_process";

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
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);

  const selectedData = selectedMultiple.flatMap(
    (date) =>
      getStoreResultState.data?.[format(new Date(date), "yyyy-MM-dd")] || []
  );

  useEffect(() => {
    const query = createQueryParams({
      selectedStore: selectedStore?.store_name,
    });

    dispatch(getStores());
    dispatch(getAuditStoreResult(query));
  }, [dispatch, selectedStore]);

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

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const pastelColor = `hsl(${hue}, 50%, 80%)`;
    return pastelColor;
  };

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
                  <div className="px-3 pb-3 space-y-2">
                    <div className="grid grid-cols-2 px-5">
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

                    <Divider />
                    <span className="flex justify-center text-lg font-medium">
                      Audit Results
                    </span>

                    {getStoreResultState.data &&
                    Object.values(getStoreResultState.data).length !== 0 ? (
                      <div className="border-2 border-primary rounded-lg flex flex-row space-x-5 p-5 overflow-auto max-h-64">
                        {Object.keys(getStoreResultState.data).map(
                          (row, index) => (
                            <div
                              key={index}
                              className="border-t-8 border-primary rounded-t-lg"
                            >
                              <span className="flex justify-center text-base text-white bg-primary ">
                                {format(new Date(row), "MMMM yyyy")}
                              </span>
                              <Table className="table-fixed border-2">
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      align="right"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Category
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Grade
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Weight
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      style={{
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Final Score
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                {getStoreResultState.data?.[row]?.map(
                                  (row, index2) => (
                                    <TableBody key={index2}>
                                      <TableRow>
                                        <TableCell align="right">
                                          {row.category_name}
                                        </TableCell>
                                        <TableCell align="right">
                                          {row.grade.toFixed(1)}
                                        </TableCell>
                                        <TableCell align="right">
                                          {row.weight.toFixed(1)}
                                        </TableCell>
                                        <TableCell align="right">
                                          {row.final_score.toFixed(1)}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  )
                                )}
                              </Table>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <span className="flex justify-center">
                        No previous audit data
                      </span>
                    )}
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
                          Category {selectedSingle}
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
                              isValid(new Date(selectedSingle))
                                ? getStoreResultState.data[
                                    format(
                                      new Date(selectedSingle),
                                      "yyyy-MM-dd"
                                    )
                                  ]
                                : []
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
                              fill={getRandomColor()}
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
                              {selectedMultiple.join(" vs ")}
                            </span>
                          </div>
                          <div className="flex space-x-5">
                            <Autocomplete
                              multiple
                              fullWidth
                              disablePortal
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
                              onChange={(event, value) => {
                                setSelectedMultiple(value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  value={selectedMultiple ?? ""}
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
                                data={selectedData}
                              >
                                <XAxis dataKey="category_name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                {selectedMultiple.map((row, index) => (
                                  <Bar
                                    key={index}
                                    dataKey="grade"
                                    name={row}
                                    barSize={10}
                                    fill={getRandomColor()}
                                  />
                                ))}
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
