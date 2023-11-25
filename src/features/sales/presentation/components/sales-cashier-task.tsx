import {
  Button,
  Divider,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect, useState } from "react";
import { TbProgressAlert } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {
  GetSalesCashierSavedFormState,
  getSalesCashierSavedForm,
  selectGetSalesCashierSavedForm,
} from "../slices/get-sales-cashier-saved-form.slice";
import { createQueryParams } from "features/config/helpers";

export function SalesTaskListCashier() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getSalesCashierSavedFormState = useAppSelector(
    selectGetSalesCashierSavedForm
  );

  useEffect(() => {
    if (
      getSalesCashierSavedFormState.status !==
        GetSalesCashierSavedFormState.success &&
      !getSalesCashierSavedFormState.data
    ) {
      dispatch(getSalesCashierSavedForm());
    }
  }, [getSalesCashierSavedFormState.data]);

  const handleOnClick = (id: string) => {
    const queryParams = createQueryParams({ type: "cashier", id: id });
    navigate({
      pathname: "saved-form",
      search: queryParams,
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5">
        <div className="flex items-stretch justify-between">
          <span className="self-center text-2xl font-['Bebas_Neue']">
            Saved Forms
          </span>
          <Button
            onClick={() => navigate("/admin/sales/form")}
            size="small"
            variant="contained"
          >
            Create new form
          </Button>
        </div>
        {getSalesCashierSavedFormState.data ? (
          <>
            <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 space-y-3 w-full md:w-3/3">
              {getSalesCashierSavedFormState.data.saved_forms.length !== 0 ? (
                <div className="hidden md:block">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      {getSalesCashierSavedFormState.data?.saved_forms.map(
                        (task) => (
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
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="hidden md:block">
                  <span className="flex justify-center ">No saved forms</span>
                </div>
              )}

              {getSalesCashierSavedFormState.data?.saved_forms.length !== 0 ? (
                <div className="block md:hidden">
                  <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white w-full">
                    <div className="flex flex-col my-2 p-2 font-['Roboto']">
                      <List>
                        {getSalesCashierSavedFormState.data?.saved_forms.map(
                          (task) => (
                            <>
                              <ListItem onClick={() => handleOnClick(task.id)}>
                                <div className="w-full">
                                  <div className="flex justify-between">
                                    <span className="text-left bg-neutral-200 px-2 py-0.5 rounded">
                                      {task.id}
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
                                </div>
                              </ListItem>
                              <Divider sx={{ marginY: 1 }} />
                            </>
                          )
                        )}
                      </List>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="block md:hidden">
                  <span className="flex justify-center ">No saved forms</span>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
