import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import { useEffect } from "react";
import { TbProgressAlert } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  GetSalesCompletedState,
  getSalesCompleted,
  selectGetSalesCompleted,
} from "../slices/get-sales-completed.slice";
import { formatDate } from "./sales-utils";
import { intToShortString } from "features/config/helpers";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

export function SalesDashboardContent() {
  const dispatch = useAppDispatch();
  const getSalesCompletedState = useAppSelector(selectGetSalesCompleted);

  useEffect(() => {
    if (
      getSalesCompletedState.status !== GetSalesCompletedState.success &&
      !getSalesCompletedState.data
    ) {
      dispatch(getSalesCompleted());
    }
  }, [getSalesCompletedState.data]);

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5">
        {getSalesCompletedState.data ? (
          <>
            <div className="flex flex-row h-28 border border-gray-200 bg-white shadow rounded-md p-3 space-x-7 overflow-x-auto">
              <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col grow items-center justify-center">
                <span className="text-4xl font-bold text-secondary">
                  {getSalesCompletedState.data.approved_count
                    ? intToShortString(
                        getSalesCompletedState.data.approved_count
                      )
                    : 0}
                </span>
                <span className="text-sm text-secondary ">Approved</span>
              </div>
              <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col grow items-center justify-center">
                <span className="text-4xl font-bold text-secondary">
                  {getSalesCompletedState.data.approved_count
                    ? intToShortString(
                        getSalesCompletedState.data.not_approved_count
                      )
                    : 0}
                </span>
                <span className="text-sm text-secondary ">Not Approved</span>
              </div>
              <div className="lg:shadow-[0_3px_10px_rgba(0,0,0,0.3)] flex flex-col grow items-center justify-center">
                <span className="text-4xl font-bold text-secondary">
                  {getSalesCompletedState.data.total_count
                    ? intToShortString(getSalesCompletedState.data.total_count)
                    : 0}
                </span>
                <span className="text-sm text-secondary ">Total Count</span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 space-y-3 w-full md:w-3/3">
                {getSalesCompletedState.data.completed.length !== 0 ? (
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>id</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Store Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, width: 120 }}>
                          Date
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Shift</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Cashier Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>TC Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>TC Grade</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Manager Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, width: 150 }}>
                          Manager Grade
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getSalesCompletedState.data?.completed.map((data) => (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className="w-full"
                        >
                          <TableCell component="th" scope="row">
                            {data.manager_grade === "Approved" ? (
                              <FaRegCheckCircle size={20} color="4CAF50" />
                            ) : (
                              <IoIosCloseCircleOutline
                                size={20}
                                color="F44336"
                              />
                            )}
                          </TableCell>
                          <TableCell sx={{ fontSize: 14 }}>
                            # {data.id}
                          </TableCell>
                          <TableCell sx={{ fontSize: 14 }}>
                            {data.store}
                          </TableCell>
                          <TableCell sx={{ fontSize: 14 }}>
                            {formatDate(data.entry_date)}
                          </TableCell>
                          <TableCell sx={{ fontSize: 14 }}>
                            {data.shift}
                          </TableCell>
                          <TableCell sx={{ fontSize: 14 }}>
                            {data.cashier_first_name +
                              " " +
                              data.cashier_last_name}
                          </TableCell>
                          <TableCell sx={{ fontSize: 14 }}>
                            {data.tc_first_name + " " + data.tc_last_name}
                          </TableCell>
                          <TableCell sx={{ fontSize: 14 }}>
                            {data.tc_grade}
                          </TableCell>
                          <TableCell sx={{ fontSize: 14 }}>
                            {data.manager_first_name +
                              " " +
                              data.manager_last_name}
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontSize={14}>
                              <Box
                                sx={{ fontWeight: 600 }}
                                className="border-2 border-none"
                              >
                                <span className="bg-amber-300 px-2 py-0.5 rounded text-amber-600">
                                  {data.manager_grade}
                                </span>
                              </Box>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <span className="flex justify-center">No pending task</span>
                )}
              </div>
            </div>
            <div className="block md:hidden">
              <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white w-full">
                {getSalesCompletedState.data.completed.length !== 0 ? (
                  <div className="flex flex-col my-2 p-2 font-['Roboto']">
                    <List>
                      {getSalesCompletedState.data?.completed.map((data) => (
                        <>
                          <ListItem>
                            <div className="w-full">
                              <div className="flex justify-between">
                                <span className="text-left bg-neutral-200 px-2 py-0.5 rounded">
                                  {data.id}
                                </span>
                                <span className="text-end bg-amber-300 px-2 py-0.5 rounded text-amber-600">
                                  {data.manager_grade}
                                </span>
                              </div>
                              <div className="pt-2 font-semibold">
                                <span>{data.store}</span>
                              </div>
                              <div className="py-px">
                                <span>
                                  {data.entry_date} - {data.shift}
                                </span>
                              </div>
                              <div className="py-px">
                                <span>
                                  {data.cashier_first_name +
                                    " " +
                                    data.cashier_last_name}
                                </span>
                              </div>
                            </div>
                          </ListItem>
                          <Divider sx={{ marginY: 1 }} />
                        </>
                      ))}
                    </List>
                  </div>
                ) : (
                  <span className="flex justify-center py-5">
                    No pending task
                  </span>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
