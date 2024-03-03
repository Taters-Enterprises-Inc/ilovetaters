import { TextField, Button } from "@mui/material";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { updateStatus } from "features/stock-ordering/core/stock-ordering.params";
import React, { useState } from "react";
import { updateConfirmPayment } from "../slices/update-confirm-payment.slice";
import { StockOrderRemarks } from "./stock-order-remarks";
import { useAppDispatch } from "features/config/hooks";
import { PopupModal } from "../modals";
import {
  openMessageModal,
  closeMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";

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

  const [openPopupModal, setOpenPopupModal] = useState(false);

  const handleConfirmPayment = (orderStatus: string) => () => {
    dispatch(
      openMessageModal({
        message: `Confirming this action will ${
          orderStatus === "8"
            ? "reject the receipt and revert the order status to TEI Finance"
            : "mark the order as paid"
        }. Are you sure you want to proceed?`,
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
              const updateConfirmPaymentParam: updateStatus = {
                id: props.orderId,
                remarks: remarks,
                status: orderStatus,
              };

              dispatch(updateConfirmPayment(updateConfirmPaymentParam));

              document.body.classList.remove("overflow-hidden");
              props.onClose(true);
              dispatch(closeMessageModal());
            },
          },
          {
            color: "#22201A",
            text: "No",
            onClick: () => {
              dispatch(closeMessageModal());
            },
          },
        ],
      })
    );
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
              onClick={handleConfirmPayment("8")}
              sx={STOCK_ORDERING_BUTTON_STYLE}
            >
              Return to Tei Finance
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={handleConfirmPayment("10")}
              sx={STOCK_ORDERING_BUTTON_STYLE}
            >
              Validate
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
