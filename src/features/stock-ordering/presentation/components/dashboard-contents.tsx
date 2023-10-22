import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { GoAlertFill, GoCheckCircle, GoPencil } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  GetOverdueTaskState,
  getOverdueTask,
  selectGetOverdueTask,
} from "../slices/get-overdue-task.slice";
import { dateSetup } from "./stock-ordering-utils";
import { ProcessModal } from "../modals";
import { FaGalacticSenate } from "react-icons/fa";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #d6d6d6",
  p: 4,
};

export function DashboardContents() {
  const dispatch = useAppDispatch();

  const getOverdueTaskState = useAppSelector(selectGetOverdueTask);

  const [orderId, setOrderId] = useState("");
  const [tabValue, setTabValue] = useState<number>(0);

  const [open, setOpen] = useState(false);
  const [isPayBilling, setIsPaybilling] = useState(false);

  const handleOpen = (ordrId: string, tab: number) => {
    setOrderId(ordrId);
    setTabValue(tab);
    setOpen(true);
  };

  useEffect(() => {
    if (getOverdueTaskState.data === undefined) {
      dispatch(getOverdueTask());
    }
  }, [getOverdueTaskState.data]);

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div>
          <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
            Dashboard
          </span>
        </div>

        <div className="rounded-lg">
          <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 space-y-3 w-full md:w-3/3">
            <span className="text-secondary text-3xl font-['Bebas_Neue'] flex">
              Overdue Tasks
            </span>
            <Divider />

            {getOverdueTaskState.status === GetOverdueTaskState.success &&
            getOverdueTaskState.data ? (
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {getOverdueTaskState.data.map((task) => (
                  <>
                    <ListItem className="flex space-x-5 hover:bg-zinc-200">
                      <ListItemAvatar>
                        <GoAlertFill size={40} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <div>
                            <Box fontWeight="fontWeightBold">{task.name}</Box>
                          </div>
                        }
                        secondary={
                          <Box fontSize={"14px"}>
                            Last Updated:{" "}
                            {dateSetup(task.last_processed_date, true)}
                          </Box>
                        }
                      />
                      <Box>
                        <Button
                          variant="contained"
                          startIcon={<GoPencil />}
                          onClick={() =>
                            handleOpen(task.order_id, task.process_id)
                          }
                        >
                          <Box sx={{ display: { xs: "none", md: "block" } }}>
                            Update
                          </Box>
                        </Button>
                      </Box>
                    </ListItem>

                    {getOverdueTaskState.data &&
                      getOverdueTaskState.data.length > task.id && (
                        <Divider variant="inset" component="li" />
                      )}
                  </>
                ))}
              </List>
            ) : (
              <span className="flex justify-center">No overdue task</span>
            )}
          </div>
        </div>
      </div>

      <ProcessModal
        open={open}
        onClose={() => {
          setOpen(false);
          setIsPaybilling(false);
        }}
        currentTab={tabValue - 1}
        id={orderId}
        payMultipleBilling={isPayBilling}
      />
    </>
  );
}
