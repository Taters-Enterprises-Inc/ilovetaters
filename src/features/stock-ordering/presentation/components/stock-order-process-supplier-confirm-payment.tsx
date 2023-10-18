import { TextField, Button } from "@mui/material";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { updateStatus } from "features/stock-ordering/core/stock-ordering.params";
import React, { useState } from "react";
import { updateConfirmPayment } from "../slices/update-confirm-payment.slice";
import { StockOrderRemarks } from "./stock-order-remarks";
import { useAppDispatch } from "features/config/hooks";
import { PopupModal } from "../modals";

interface StockOrderProcessSupplierConfirmPaymentProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessSupplierConfirmPayment(
  props: StockOrderProcessSupplierConfirmPaymentProps
) {
  const dispatch = useAppDispatch();
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("");

  const [openPopupModal, setOpenPopupModal] = useState(false);

  const handleValidate = (value: string) => {
    setStatus(value);
    setOpenPopupModal(true);
  };

  const handleConfirmPayment = () => {
    const updateConfirmPaymentParam: updateStatus = {
      id: props.orderId,
      remarks: remarks,
      status: status,
    };

    dispatch(updateConfirmPayment(updateConfirmPaymentParam));

    document.body.classList.remove("overflow-hidden");
    props.onClose(true);
  };

  return (
    <>
      <div className="space-y-2">
        <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />

        <div className="flex flex-col space-y-2 ">
          <div className="flex space-x-4">
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleValidate("7")}
              sx={STOCK_ORDERING_BUTTON_STYLE}
            >
              Return to Tei Finance
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={() => handleValidate("9")}
              sx={STOCK_ORDERING_BUTTON_STYLE}
            >
              Validate
            </Button>
          </div>
        </div>
      </div>

      <PopupModal
        open={openPopupModal}
        title={"Confirmation"}
        message={
          status === "7" ? (
            <span>
              Are you sure you want to{" "}
              <span className="font-semibold underline underline-offset-1">
                Return to TEI the Receipt
              </span>
              ?
            </span>
          ) : (
            <span>
              Are you sure you want to{" "}
              <span className="font-semibold underline underline-offset-1">
                Confirm the Receipt
              </span>
              ?
            </span>
          )
        }
        handleNoButton={() => setOpenPopupModal(false)}
        handleYesButton={handleConfirmPayment}
      />
    </>
  );
}
