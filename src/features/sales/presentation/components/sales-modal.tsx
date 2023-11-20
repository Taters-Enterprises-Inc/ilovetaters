import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  GetSalesActiveFieldsState,
  getSalesActiveFields,
  selectGetSalesActiveFields,
} from "../slices/get-active-fields.slice";
import { Button, Box, Modal } from "@mui/material";
import React from "react";
import { SalesCard } from "./sales-card";

export function SalesModal() {
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getSalesActiveFieldsState = useAppSelector(selectGetSalesActiveFields);

  useEffect(() => {
    if (
      getSalesActiveFieldsState.status !== GetSalesActiveFieldsState.success &&
      !getSalesActiveFieldsState.data
    ) {
      dispatch(getSalesActiveFields());
    }
  }, [getSalesActiveFieldsState.data]);

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 20,
  };

  return (
    <>
      {getAdminSessionState.data?.admin ? (
        <>
          <div>
            <Button onClick={handleOpen} variant="contained">
              Open Modal
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="lg:w-2/3">
                <SalesCard />
              </Box>
            </Modal>
          </div>
        </>
      ) : null}
    </>
  );
}
