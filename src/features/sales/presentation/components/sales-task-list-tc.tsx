import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import React, { useEffect } from "react";
import { TbProgressAlert } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  GetSalesTCPendingTaskState,
  getSalesTCPendingTask,
  selectGetSalesTCPendingTask,
} from "../slices/get-sales-tc-pending-task.slice";
import { Navigate, useNavigate } from "react-router-dom";

export function SalesTaskListTC() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getSalesTcPendingTaskState = useAppSelector(
    selectGetSalesTCPendingTask
  );

  useEffect(() => {
    if (
      getSalesTcPendingTaskState.status !==
        GetSalesTCPendingTaskState.success &&
      !getSalesTcPendingTaskState.data
    ) {
      dispatch(getSalesTCPendingTask());
    }
  }, [getSalesTcPendingTaskState.data]);

  const handleOnClick = (id: string) => {
    const path = "task-form/" + id;
    navigate(path);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5">
        <div className="hidden md:block">
          <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 space-y-3 w-full md:w-3/3">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {getSalesTcPendingTaskState.data?.task.map((task) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                    onClick={() => handleOnClick(task.id)}
                    className="w-full"
                  >
                    <TableCell component="th" scope="row" width={40}>
                      <TbProgressAlert size={25} />
                    </TableCell>
                    <TableCell width={100} sx={{ fontSize: 14 }}>
                      # {task.id}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: 14 }}
                      width={400}
                    >
                      {task.store}
                    </TableCell>
                    <TableCell sx={{ fontSize: 14 }} width={150}>
                      {task.entry_date}
                    </TableCell>
                    <TableCell sx={{ fontSize: 14 }} width={80}>
                      {task.shift}
                    </TableCell>
                    <TableCell sx={{ fontSize: 14 }} width={150}>
                      {task.cashier_name}
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontSize={14}>
                        <Box
                          sx={{ fontWeight: 600 }}
                          className="border-2 border-none"
                        >
                          <span className="bg-amber-300 px-2 py-0.5 rounded text-amber-600">
                            {task.grade}
                          </span>
                        </Box>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="block md:hidden">
          <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white w-full">
            <div className="flex flex-col my-2 p-2 font-['Roboto']">
              <List>
                {getSalesTcPendingTaskState.data?.task.map((task) => (
                  <>
                    <ListItem>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <span className="text-left bg-neutral-200 px-2 py-0.5 rounded">
                            {task.id}
                          </span>
                          <span className="text-end bg-amber-300 px-2 py-0.5 rounded text-amber-600">
                            {task.grade}
                          </span>
                        </div>
                        <div className="pt-2 font-semibold">
                          <span>{task.store}</span>
                        </div>
                        <div className="py-px">
                          <span>
                            {task.entry_date} - {task.shift}
                          </span>
                        </div>
                        <div className="py-px">
                          <span>{task.cashier_name}</span>
                        </div>
                      </div>
                    </ListItem>
                    <Divider sx={{ marginY: 1 }} />
                  </>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
