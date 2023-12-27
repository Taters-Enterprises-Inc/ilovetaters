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
  const [openPopup, setOpenPopUp] = useState(false);
  const [openBillingReceiptModal, setOpenBillingReceiptModal] = useState(false);

  const [uploadedBillingReceipt, setUploadedBillingReceipt] = useState<
    File | string
  >("");

  const [openviewImageModal, setOpenViewImageModal] = useState(false);

  const handleFranchiseePaybill = () => {
    const franchiseeParam: FranchiseePayBillParam = {
      id: props.orderId,
      remarks: remarks,
      uploadedBillingReceipt: uploadedBillingReceipt,
    };

    dispatch(updateFranchiseePayBill(franchiseeParam));

    document.body.classList.remove("overflow-hidden");
    props.onClose(true);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-col space-y-3">
          <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />
        </div>
        <div
          className={`"grid " ${
            uploadedBillingReceipt === "" || !uploadedBillingReceipt
              ? "grid grid-rows-1 gap-4"
              : "grid grid-rows-2 gap-4"
          }`}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Button
                fullWidth
                size="small"
                sx={STOCK_ORDERING_BUTTON_STYLE}
                onClick={() => setOpenBillingReceiptModal(true)}
                variant="contained"
              >
                Upload billing receipt
              </Button>
            </div>
            <div>
              <Button
                fullWidth
                size="small"
                onClick={() => setOpenPopUp(true)}
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
          <div
            className={`${
              uploadedBillingReceipt === "" || !uploadedBillingReceipt
                ? "hidden"
                : "flex"
            }`}
          >
            <Button size="small" onClick={() => setOpenViewImageModal(true)}>
              Preview uploaded image
            </Button>
          </div>
        </div>
      </div>

      <PopupModal
        open={openPopup}
        title={"Submit Confirmation"}
        message={
          <span>
            Are you sure you want to{" "}
            <span className="font-semibold underline underline-offset-1">
              release the payment receipt??
            </span>
          </span>
        }
        handleYesButton={handleFranchiseePaybill}
        handleNoButton={() => {
          setOpenPopUp(false);
        }}
      />

      <PayBillingModal
        open={openBillingReceiptModal}
        onClose={() => setOpenBillingReceiptModal(false)}
        setUploadedReciept={setUploadedBillingReceipt}
        isButtonAvailable={true}
      />

      <ViewImageModal
        open={openviewImageModal}
        onClose={() => setOpenViewImageModal(false)}
        image={uploadedBillingReceipt}
        isDownloadable={false}
      />
    </>
  );
}
