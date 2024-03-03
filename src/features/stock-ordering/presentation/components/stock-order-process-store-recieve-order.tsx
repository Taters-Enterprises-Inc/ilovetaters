import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { useState } from "react";
import { StockOrderRemarks } from "./stock-order-remarks";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import dayjs from "dayjs";
import { receiveOrdersParam } from "features/stock-ordering/core/stock-ordering.params";
import { useAppDispatch } from "features/config/hooks";
import { isQuantityEmpty, isValidFile } from "./stock-ordering-utils";
import {
  openMessageModal,
  closeMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";
import { updateReceiveOrders } from "../slices/update-receive-order.slice";
import { StockOrderUploadFile } from "./stock-order-upload-file-util";

interface StockOrderProcessStoreRecieveOrderProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessStoreRecieveOrder(
  props: StockOrderProcessStoreRecieveOrderProps
) {
  const dispatch = useAppDispatch();

  const [remarks, setRemarks] = useState("");
  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");
  const [actualDeliveryDate, setActualDeliveryDate] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  const handleSubmitOrder = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (isValidFile(uploadedReceipt, true)) {
      dispatch(
        openMessageModal({
          message:
            "By clicking 'YES', you confirm that the products are complete and in good condition",
          buttons: [
            {
              color: "#CC5801",
              text: "Yes",
              onClick: () => {
                const receieveOrdersProductDataParam: receiveOrdersParam["product_data"] =
                  props.rows?.product_data.map(
                    (product: {
                      id: any;
                      product_id: any;
                      delivered_qty: any;
                    }) => ({
                      id: product.id,
                      productId: product.product_id,
                      deliveryQuantity: product.delivered_qty,
                    })
                  ) ?? [];

                const receiveOrdersParamData: receiveOrdersParam = {
                  id: props.orderId,
                  actualDeliveryDate: actualDeliveryDate,
                  updatedDeliveryReceipt: uploadedReceipt,
                  remarks: remarks,
                  product_data: receieveOrdersProductDataParam,
                };

                dispatch(updateReceiveOrders(receiveOrdersParamData));

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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitOrder}>
        <div className="px-2 space-y-3">
          <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />

          <div className="flex-1 w-full space-y-3 md:flex md:space-x-3">
            <div className="md:basis-1/2 md:mt-2.5">
              <StockOrderUploadFile
                uploadedImage={(file: File | string) =>
                  setUploadedReciept(file)
                }
                uploadButtonName={"Store sales invoice image"}
              />
            </div>

            <div
              className={`flex basis-1/2 space-y-2 ${
                uploadedReceipt !== "" && "items-center"
              }`}
            >
              <div className="flex-1 space-y-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Actual delivery date and time"
                    views={["year", "month", "day", "hours", "minutes"]}
                    onChange={(date) => {
                      if (date) {
                        const formattedDate = dayjs(date).format(
                          "YYYY-MM-DD HH:mm:ss"
                        );

                        setActualDeliveryDate(formattedDate);
                      }
                    }}
                    value={dayjs(actualDeliveryDate)}
                    minDateTime={dayjs().subtract(7, "day")}
                    renderInput={(params) => (
                      <TextField required {...params} size="small" fullWidth />
                    )}
                  />
                </LocalizationProvider>

                <div className={`${uploadedReceipt === "" && "hidden"}`}>
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    sx={STOCK_ORDERING_BUTTON_STYLE}
                    fullWidth
                    disabled={
                      isQuantityEmpty(
                        props.rows.product_data,
                        props.rows.order_information.status_id
                      ) || actualDeliveryDate === null
                    }
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
