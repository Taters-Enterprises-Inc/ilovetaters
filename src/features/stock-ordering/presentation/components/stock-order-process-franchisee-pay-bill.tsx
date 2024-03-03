import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import {
  ExcelPreviewModal,
  PayBillingModal,
  PopupModal,
  UploadDeliveryRecieptModal,
} from "../modals";
import { StockOrderRemarks } from "./stock-order-remarks";
import { useState } from "react";
import { Button } from "@mui/material";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { ViewImageModal } from "../modals/view-image.modal";
import { FranchiseePayBillParam } from "features/stock-ordering/core/stock-ordering.params";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { updateFranchiseePayBill } from "../slices/update-franchisee-pay-bill.slice";
import { selectGetProductData } from "../slices/get-product-data.slice";
import {
  openMessageModal,
  closeMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";
import { StockOrderUploadFile } from ".";

interface StockOrderProcessFranchiseePayBillProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessFranchiseePayBill(
  props: StockOrderProcessFranchiseePayBillProps
) {
  const dispatch = useAppDispatch();

  const [remarks, setRemarks] = useState("");

  const [uploadedBillingReceipt, setUploadedBillingReceipt] = useState<
    File | string
  >("");

  const handleFranchiseePaybill = () => {
    dispatch(
      openMessageModal({
        message: `Are you sure you want to proceed?`,
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
              const franchiseeParam: FranchiseePayBillParam = {
                id: props.orderId,
                remarks: remarks,
                uploadedBillingReceipt: uploadedBillingReceipt,
              };

              dispatch(updateFranchiseePayBill(franchiseeParam));

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
      <div className="space-y-3">
        <div className="flex flex-col space-y-3">
          <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />
        </div>

        <div className="flex-1 gap-2 w-full md:flex">
          <div className="md:basis-1/2">
            <StockOrderUploadFile
              uploadedImage={(file: File | string) =>
                setUploadedBillingReceipt(file)
              }
              uploadButtonName={"Payment image"}
            />
          </div>
          <div
            className={`md:basis-1/2 ${
              uploadedBillingReceipt !== "" && "flex items-center"
            }`}
          >
            <Button
              fullWidth
              size="small"
              onClick={handleFranchiseePaybill}
              sx={STOCK_ORDERING_BUTTON_STYLE}
              disabled={
                uploadedBillingReceipt === "" || !uploadedBillingReceipt
                  ? true
                  : false
              }
              variant="contained"
            >
              Release Payment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
