import { useState } from "react";
import { StockOrderRemarks } from "./stock-order-remarks";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import {
  ExcelPreviewModal,
  PopupModal,
  UploadDeliveryRecieptModal,
} from "../modals";
import {
  dispatchOrderParam,
  updateCancelledStatus,
} from "features/stock-ordering/core/stock-ordering.params";
import { updateOrderCancelled } from "../slices/update-order-cancelled.slice";
import { useAppDispatch } from "features/config/hooks";
import { updateDispatchOrders } from "../slices/update-dispatch-order.slice";
import dayjs from "dayjs";

interface StockOrderProcessSupplierDispatchOrderProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessSupplierDispatchOrder(
  props: StockOrderProcessSupplierDispatchOrderProps
) {
  const dispatch = useAppDispatch();

  const [remarks, setRemarks] = useState("");
  const [transport, setTransport] = useState("");
  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");
  const [dispatchedDelivery, setDispachedDelivery] = useState<string | null>(
    null
  );

  const [preview, setPreview] = useState(false);
  const [openPopup, setOpenPopUp] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [openExcelPreview, setOpenExcelPreview] = useState(false);
  const [openUploadDeliveryRecieptModal, setOpenUploadDeliveryRecieptModal] =
    useState(false);

  const handleOnSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setOpenPopUp(true);
    setSubmit(true);
  };

  const handlePreviewButton = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setPreview(true);
  };

  const isQuantityEmpty = () => {
    let empty = false;
    props.rows?.product_data.map((product) => {
      if (product.commited_qty === "" || product.commited_qty === null) {
        empty = true;
      }
    });

    return empty;
  };

  const isValidFile = (file: string | File | undefined): boolean => {
    if (!file) {
      return false;
    }

    if (typeof file === "string") {
      return true;
    }

    // const allowedExtensions = ["jpg", "jpeg", "png", "pdf", "xls", "xlsx"];
    const allowedExtensions = ["xls", "xlsx"];

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValidExtension =
      fileExtension && allowedExtensions.includes(fileExtension);

    if (!isValidExtension) {
      return false;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      return false;
    }

    return true;
  };

  const handleCancelledOrder = () => {
    const cancelParameter: updateCancelledStatus = {
      id: props.orderId ?? "",
      remarks: remarks ?? "",
    };
    dispatch(updateOrderCancelled(cancelParameter));

    props.onClose(true);
  };

  const handleDispatchOrder = () => {
    const dispatchedOrdersProductDataParam: dispatchOrderParam["product_data"] =
      props.rows?.product_data.map((product) => ({
        id: product.id,
        productId: product.product_id,
      })) ?? [];

    const dispatchOrdersParamData: dispatchOrderParam = {
      id: props.orderId,
      deliveryReceipt: uploadedReceipt,
      dispatchDeliveryDate:
        dayjs(dispatchedDelivery).format("hh:mm:ss a") ?? null,
      transport: transport,
      remarks: remarks,
      product_data: dispatchedOrdersProductDataParam,
    };

    dispatch(updateDispatchOrders(dispatchOrdersParamData));

    document.body.classList.remove("overflow-hidden");
    props.onClose(true);
  };

  return (
    <>
      <form className="space-y-3" onSubmit={handleOnSubmit}>
        <div className="flex flex-col px-3 space-y-3">
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-3">
            <FormControl
              sx={{
                flexBasis: { md: "50%" },
                alignSelf: { md: "flex-end" },
              }}
              disabled={preview}
              required
            >
              <FormLabel id="transport-route-label">Transport Route</FormLabel>

              <RadioGroup
                onChange={(event, value) => setTransport(value)}
                value={transport}
                row
                aria-labelledby="transport-route"
              >
                <FormControlLabel
                  value="1"
                  control={<Radio size="small" />}
                  label="Ground"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio size="small" />}
                  label="Ocean"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio size="small" />}
                  label="Air"
                />
              </RadioGroup>
            </FormControl>

            <div className="flex flex-col space-y-2 md:basis-1/2">
              <span>Dispatched Delivery Estimated Time: </span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  disabled={preview}
                  label="Dispatch Delivery Time"
                  value={dispatchedDelivery}
                  onChange={(date) => {
                    setDispachedDelivery(date);
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      autoComplete="off"
                      size="small"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>

          <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />

          <div className="flex flex-col space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <Button
                fullWidth
                size="small"
                sx={STOCK_ORDERING_BUTTON_STYLE}
                onClick={() => {
                  setOpenUploadDeliveryRecieptModal(true);
                }}
                variant="contained"
              >
                Upload Sales Invoice
              </Button>

              {preview ? (
                <Button
                  fullWidth
                  size="small"
                  type="submit"
                  variant="contained"
                  sx={STOCK_ORDERING_BUTTON_STYLE}
                >
                  Dispatch Order
                </Button>
              ) : (
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  onClick={handlePreviewButton}
                  sx={STOCK_ORDERING_BUTTON_STYLE}
                  disabled={
                    !isValidFile(uploadedReceipt) ||
                    transport === "" ||
                    isQuantityEmpty() ||
                    dispatchedDelivery === null
                  }
                >
                  Preview
                </Button>
              )}
            </div>

            <div className="flex justify-between">
              {preview && uploadedReceipt && (
                <div>
                  <span>Click here to view file content: </span>
                  <Button
                    onClick={() => setOpenExcelPreview(true)}
                    size="small"
                    variant="text"
                  >
                    {Object.values(uploadedReceipt).map((name) => name)}
                  </Button>
                </div>
              )}
              <div>
                <Button size="small" onClick={() => setOpenPopUp(true)}>
                  <span className="text-primary underline">Cancel Order</span>
                </Button>

                {preview && (
                  <Button size="small" onClick={() => setPreview(false)}>
                    <span className="text-primary underline">Re-edit</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      <UploadDeliveryRecieptModal
        open={openUploadDeliveryRecieptModal}
        onClose={() => setOpenUploadDeliveryRecieptModal(false)}
        setUploadedReciept={setUploadedReciept}
        isButtonAvailable={true}
      />

      <ExcelPreviewModal
        open={openExcelPreview}
        onClose={() => setOpenExcelPreview(false)}
        file={uploadedReceipt}
      />

      <PopupModal
        open={openPopup}
        title={submit ? "Submit Confirmation" : "Order Cancellation"}
        message={
          submit ? (
            <span>
              Are you sure you want to{" "}
              <span className="font-semibold underline underline-offset-1">
                Dispatch the Order?
              </span>
            </span>
          ) : (
            <span>
              Are you sure you want to{" "}
              <span className="font-semibold underline underline-offset-1">
                cancel the order
              </span>
            </span>
          )
        }
        handleYesButton={submit ? handleDispatchOrder : handleCancelledOrder}
        handleNoButton={() => {
          setOpenPopUp(false);
          setSubmit(false);
        }}
      />
    </>
  );
}
