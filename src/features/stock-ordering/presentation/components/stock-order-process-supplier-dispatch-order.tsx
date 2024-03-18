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
  dispatchOrderParam,
  updateCancelledStatus,
} from "features/stock-ordering/core/stock-ordering.params";
import { updateOrderCancelled } from "../slices/update-order-cancelled.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { updateDispatchOrders } from "../slices/update-dispatch-order.slice";
import dayjs from "dayjs";
import { isValidFile } from "./stock-ordering-utils";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { StockOrderUploadFile } from "./stock-order-upload-file-util";
import {
  openMessageModal,
  closeMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";

interface StockOrderProcessSupplierDispatchOrderProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessSupplierDispatchOrder(
  props: StockOrderProcessSupplierDispatchOrderProps
) {
  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

  const [remarks, setRemarks] = useState("");
  const [transport, setTransport] = useState("");
  const [uploadedReceipt, setUploadedReceipt] = useState<File | string>("");
  const [dispatchedDelivery, setDispachedDelivery] = useState<string | null>(
    null
  );

  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);

  const franchiseType =
    getProductDataState.data?.order_information.franchise_type_id;

  const handleOnSubmit = (isCancelled: boolean) => () => {
    dispatch(
      openMessageModal({
        message: `Confirming this action will ${
          isCancelled
            ? "cancel the order"
            : "move the order for the next process"
        }. Are you sure you want to proceed?`,
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
              if (isCancelled) {
                handleCancelledOrder();
              } else {
                handleDispatchOrder();
              }
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

  const handleCancelledOrder = () => {
    const cancelParameter: updateCancelledStatus = {
      id: props.orderId ?? "",
      remarks: remarks ?? "",
    };
    dispatch(updateOrderCancelled(cancelParameter));

    document.body.classList.remove("overflow-hidden");
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
      <div className="space-y-3">
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

          <div className="flex-1 w-full space-y-1">
            <div
              className={`md:flex w-full ${
                uploadedReceipt === "" ? "flex-wrap" : ""
              } md:space-x-3`}
            >
              <StockOrderUploadFile
                uploadedImage={(file: File | string) =>
                  setUploadedReceipt(file)
                }
                uploadButtonName={"Sales invoice"}
                excelFile
                className={`${uploadedReceipt !== "" && "md:basis-1/2"} `}
              />

              <div
                className={`${
                  uploadedReceipt !== "" && "flex items-end"
                } md:basis-1/2`}
              >
                <div className="w-full">
                  <div className={`${uploadedReceipt === "" && "hidden"}`}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      sx={STOCK_ORDERING_BUTTON_STYLE}
                      disabled={
                        !isValidFile(uploadedReceipt, false) ||
                        transport === "" ||
                        dispatchedDelivery === null
                      }
                      onClick={handleOnSubmit(false)}
                    >
                      Confirm
                    </Button>
                  </div>
                  <div
                    className={`${
                      uploadedReceipt !== "" && "flex justify-end"
                    }`}
                  >
                    <Button variant="text" onClick={handleOnSubmit(true)}>
                      Cancel Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
