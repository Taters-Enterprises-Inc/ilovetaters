import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { StockOrderRemarks } from "./stock-order-remarks";
import { useState } from "react";
import { useAppDispatch } from "features/config/hooks";
import { Button } from "@mui/material";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { PayBillingModal } from "../modals/pay-your-billing.modal";
import { ViewImageModal } from "../modals/view-image.modal";

interface StockOrderProcessPaybillPenaltyProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessPaybillPenalty(
  props: StockOrderProcessPaybillPenaltyProps
) {
  const dispatch = useAppDispatch();

  const [remarks, setRemarks] = useState("");
  const [openUploadImage, setOpenUploadImage] = useState(false);
  const [openViewImage, setOpenViewImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | string>("");

  const handleSubmitOrder = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const handleOpenUploadPayment = () => setOpenUploadImage(true);
  const handleOpenViewImage = () => setOpenViewImage(true);

  return (
    <>
      <form onSubmit={handleSubmitOrder}>
        <div className="px-2 space-y-3">
          <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />

          <div className={`${uploadedImage !== "" && "hidden md:hidden"}`}>
            <Button
              fullWidth
              variant="contained"
              sx={STOCK_ORDERING_BUTTON_STYLE}
              onClick={handleOpenUploadPayment}
            >
              Upload payment
            </Button>
          </div>

          <div
            className={`flex-1 space-y-2 md:flex md:justify-between ${
              uploadedImage === "" && "hidden md:hidden"
            }`}
          >
            <div className="flex justify-between">
              <Button variant="text" onClick={handleOpenViewImage}>
                View Image
              </Button>
              <Button variant="text" onClick={handleOpenUploadPayment}>
                Reupload
              </Button>
            </div>
            <div className="md:w-1/2">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={STOCK_ORDERING_BUTTON_STYLE}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </form>

      <PayBillingModal
        open={openUploadImage}
        onClose={() => setOpenUploadImage(false)}
        setUploadedReciept={setUploadedImage}
        isButtonAvailable={true}
      />

      <ViewImageModal
        open={openViewImage}
        onClose={() => setOpenViewImage(false)}
        image={uploadedImage}
        isDownloadable={false}
      />
    </>
  );
}
