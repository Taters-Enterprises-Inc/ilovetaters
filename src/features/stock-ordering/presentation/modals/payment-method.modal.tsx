import { Card, CardContent, CardActions, Button, Divider } from "@mui/material";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PayBillingModal } from "./pay-your-billing.modal";
import { ViewImageModal } from "./view-image.modal";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectconfirmNewOrder } from "../slices/confirm-new-order.slice";
import { insertNewOrder } from "../slices/insert-new-order.slice";
import { InsertNewOrderParam } from "features/stock-ordering/core/stock-ordering.params";

interface PaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaymentMethodModal(props: PaymentMethodModalProps) {
  const dispatch = useAppDispatch();

  const [openUploadReceipt, setOpenUploadReceipt] = useState(false);
  const [openViewImage, setOpenViewImage] = useState(false);
  const [uploadedReceipt, setUploadedReceipt] = useState<File | string>("");

  const getOrderInformation = useAppSelector(selectconfirmNewOrder);

  const handleUploadPaymentButton = () => setOpenUploadReceipt(true);
  const handleViewPaymentButton = () => setOpenViewImage(true);

  const confirmPayment = (type: number) => () => {};

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div
        id="place-order-modal"
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-[97%] bg-white lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Payment Method</span>
            <button
              className="text-2xl text-white"
              onClick={() => {
                document.body.classList.remove("overflow-hidden");
                props.onClose();
              }}
            >
              <IoMdClose />
            </button>
          </div>

          <div className="flex justify-center p-10 space-x-10">
            <Card elevation={0} sx={{ maxWidth: 280 }}>
              <CardContent>
                <div className="text-lg font-semibold">
                  Upload payment receipt
                </div>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="space-y-2">
                  <Button
                    fullWidth
                    size="small"
                    onClick={handleUploadPaymentButton}
                    variant={uploadedReceipt === "" ? "contained" : "text"}
                  >
                    {uploadedReceipt !== "" ? "reupload image" : "upload image"}
                  </Button>
                  <Divider
                    flexItem
                    sx={{ display: uploadedReceipt !== "" ? "block" : "none" }}
                  />
                  <Button
                    sx={{ display: uploadedReceipt !== "" ? "block" : "none" }}
                    fullWidth
                    size="small"
                    onClick={handleViewPaymentButton}
                    variant="text"
                  >
                    view receipt
                  </Button>
                </div>

                <Button
                  fullWidth
                  size="small"
                  onClick={confirmPayment(1)}
                  variant="contained"
                  sx={{
                    marginTop: 3,
                    display: uploadedReceipt !== "" ? "block" : "none",
                  }}
                >
                  Confirm payment
                </Button>
              </CardActions>
            </Card>

            <Divider orientation="vertical" flexItem>
              or
            </Divider>

            <Card elevation={0} sx={{ maxWidth: 280 }}>
              <CardContent>
                <div className="text-lg font-semibold">Credit card payment</div>
                <div className="mt-1 text-gray-500">
                  Click the button below to request the payment link. And wait
                  for supplier to attach the link in new orders tab
                </div>
              </CardContent>
              <CardActions>
                <Button onClick={confirmPayment(2)} fullWidth size="small">
                  Request Link
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>

      <PayBillingModal
        open={openUploadReceipt}
        onClose={() => setOpenUploadReceipt(false)}
        setUploadedReciept={setUploadedReceipt}
        isButtonAvailable={true}
      />

      <ViewImageModal
        open={openViewImage}
        onClose={() => setOpenViewImage(false)}
        image={uploadedReceipt}
        isDownloadable={false}
      />
    </>
  );
}
