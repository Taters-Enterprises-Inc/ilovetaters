import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect, useState } from "react";
import { TbProgressAlert } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { getSalesTCPendingTask } from "../slices/get-sales-tc-pending-task.slice";
import {
  GetSalesManagerPendingTaskState,
  getSalesManagerPendingTask,
  selectGetSalesManagerPendingTask,
} from "../slices/get-sales-manager-pending.slice";

export function SalesTaskListManager() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getSalesManagerPendingTaskState = useAppSelector(
    selectGetSalesManagerPendingTask
  );

  useEffect(() => {
    if (
      getSalesManagerPendingTaskState.status !==
        GetSalesManagerPendingTaskState.success &&
      !getSalesManagerPendingTaskState.data
    ) {
      dispatch(getSalesManagerPendingTask());
    }
  }, [getSalesManagerPendingTaskState.data]);

  const handleOnClick = (id: string) => {
    const path = "task-form/" + id;
    navigate(path);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 space-y-3 w-full md:w-3/3">
          <div className="hidden md:block">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {getSalesManagerPendingTaskState.data?.task.map((task) => (
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
      </div>
    </div>
  );
}
