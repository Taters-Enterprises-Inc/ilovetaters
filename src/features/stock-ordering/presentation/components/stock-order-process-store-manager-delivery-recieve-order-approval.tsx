import React, { useState } from "react";
import { StockOrderRemarks } from "./stock-order-remarks";
import { Button } from "@mui/material";
import { updateDeliveryReceiveApproval } from "features/stock-ordering/core/stock-ordering.params";
import { updateDeliveryReceiveApprovalOrders } from "../slices/update-delivery-receive-approval.slice";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { PopupModal } from "../modals";
import { selectGetProductData } from "../slices/get-product-data.slice";
import {
  openMessageModal,
  closeMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";

interface StockOrderProcessStoreManagerDeliveryRecieveOrderApprovalProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessStoreManagerDeliveryRecieveOrderApproval(
  props: StockOrderProcessStoreManagerDeliveryRecieveOrderApprovalProps
) {
  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

  const [remarks, setRemarks] = useState("");

  const franchiseType =
    getProductDataState.data?.order_information.franchise_type_id;

  const handleDeliveryRecieveApproval = (status: string) => () => {
    dispatch(
      openMessageModal({
        message: `Confirming this action will ${
          status === "5"
            ? "reject the order"
            : "approve and move the order for the next process"
        }. Are you sure you want to proceed?`,
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
              const updateDeliveryReceiveApprovalParam: updateDeliveryReceiveApproval =
                {
                  id: props.orderId,
                  status: status,
                  remarks: remarks,
                };

              dispatch(
                updateDeliveryReceiveApprovalOrders(
                  updateDeliveryReceiveApprovalParam
                )
              );

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
      <div className="px-2 space-y-3">
        <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />
        <div className="flex space-x-3">
          <Button
            fullWidth
            variant="contained"
            onClick={handleDeliveryRecieveApproval("5")}
            sx={{
              color: "white",
              backgroundColor: "#CC5801",
            }}
          >
            Reject
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={
              franchiseType !== 1
                ? handleDeliveryRecieveApproval("9")
                : handleDeliveryRecieveApproval("7")
            }
            sx={{
              color: "white",
              backgroundColor: "#CC5801",
            }}
          >
            Approve
          </Button>
        </div>
      </div>
    </>
  );
}
