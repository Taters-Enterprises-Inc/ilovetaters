import React, { useState } from "react";
import { StockOrderRemarks } from "./stock-order-remarks";
import { Button } from "@mui/material";
import { updateDeliveryReceiveApproval } from "features/stock-ordering/core/stock-ordering.params";
import { updateDeliveryReceiveApprovalOrders } from "../slices/update-delivery-receive-approval.slice";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { PopupModal } from "../modals";
import { selectGetProductData } from "../slices/get-product-data.slice";

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
  const [status, setStatus] = useState("");

  const [openPopupModal, setOpenPopupModal] = useState(false);

  const franchiseType =
    getProductDataState.data?.order_information.franchise_type_id;

  const handleOnclick = (value: string) => {
    setStatus(value);
    setOpenPopupModal(true);
  };

  const handleDeliveryRecieveApproval = () => {
    const updateDeliveryReceiveApprovalParam: updateDeliveryReceiveApproval = {
      id: props.orderId,
      status: status,
      remarks: remarks,
    };

    dispatch(
      updateDeliveryReceiveApprovalOrders(updateDeliveryReceiveApprovalParam)
    );

    document.body.classList.remove("overflow-hidden");
    props.onClose(true);
  };

  return (
    <>
      <div className="px-2 space-y-3">
        <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />
        <div className="flex space-x-3">
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleOnclick("5")}
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
            onClick={() => {
              if (franchiseType !== 1) {
                handleOnclick("9");
              } else {
                handleOnclick("7");
              }
            }}
            sx={{
              color: "white",
              backgroundColor: "#CC5801",
            }}
          >
            Approve
          </Button>
        </div>
      </div>

      <PopupModal
        open={openPopupModal}
        title={"Confirmation"}
        message={
          status === "4" ? (
            <span>
              Are you sure you want to{" "}
              <span className="font-semibold underline underline-offset-1">
                Reject the Order
              </span>{" "}
              ?
            </span>
          ) : (
            <span>
              Are you sure you want to{" "}
              <span className="font-semibold underline underline-offset-1">
                Approve the Order
              </span>{" "}
              ?
            </span>
          )
        }
        handleYesButton={handleDeliveryRecieveApproval}
        handleNoButton={() => setOpenPopupModal(false)}
      />
    </>
  );
}
