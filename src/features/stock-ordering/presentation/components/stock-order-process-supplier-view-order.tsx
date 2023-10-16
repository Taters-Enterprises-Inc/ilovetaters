import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { TextField, Button, ButtonGroup } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StockOrderRemarks } from "./stock-order-remarks";
import { useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetStockOrderStores } from "../slices/get-store.slice";
import { PopupModal } from "../modals";
import {
  newOrdersParam,
  updateCancelledStatus,
} from "features/stock-ordering/core/stock-ordering.params";
import { updateOrderCancelled } from "../slices/update-order-cancelled.slice";
import { updateNewOrders } from "../slices/update-new-order.slice";
import { BsCheckCircleFill } from "react-icons/bs";

interface SupplierViewOrderProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessSupplierViewOrder(
  props: SupplierViewOrderProps
) {
  const dispatch = useAppDispatch();

  const getStoreState = useAppSelector(selectGetStockOrderStores);

  const [remarks, setRemarks] = useState("");
  const [preview, setPreview] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [preSubmitAlert, setPreSubmitAlert] = useState(false);
  const [CommitedDeliveryDate, setCommitedDeliveryDate] = useState<
    string | null
  >(null);

  const handleOnSubmit = () => {
    const reviewOrdersProductDataParam: newOrdersParam["product_data"] =
      props.rows?.product_data.map((productsItem) => ({
        id: productsItem.id,
        productId: productsItem.product_id,
        commitedQuantity: productsItem.commited_qty,
        out_of_stock: productsItem.out_of_stock,
      })) ?? [];

    const reviewOrdersParamData: newOrdersParam = {
      id: props.orderId,
      commitedDelivery: CommitedDeliveryDate,
      remarks: remarks,
      product_data: reviewOrdersProductDataParam,
    };

    dispatch(updateNewOrders(reviewOrdersParamData));

    props.onClose(true);
  };

  const handleSubmitOrder = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setPreSubmitAlert(true);
    setOpenPopup(true);
  };

  const handleCancelledOrder = () => {
    const cancelParameter: updateCancelledStatus = {
      id: props.orderId ?? "",
      remarks: remarks ?? "",
    };
    dispatch(updateOrderCancelled(cancelParameter));

    props.onClose(true);
  };

  const convertTo12HourFormat = (time: string) => {
    const formattedTime = dayjs(time, "HH:mm:ss").format("h:mm A");
    return formattedTime;
  };

  const getTimeLimit = (type: string) => {
    switch (type) {
      case "start":
        if (getStoreState.data?.window_time) {
          const { start_time } = getStoreState.data.window_time;
          return dayjs(start_time, "HH:mm:ss");
        }
        break;

      case "end":
        if (getStoreState.data?.window_time) {
          const { end_Time } = getStoreState.data.window_time;
          return dayjs(end_Time, "HH:mm:ss");
        }
        break;
    }

    return dayjs();
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

  return (
    <>
      <form onSubmit={handleSubmitOrder}>
        <div className="px-2 space-y-3">
          <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />

          <div className="flex flex-col space-y-2 md:flex-row md:space-x-5 ">
            <div className="basis-full md:basis-1/2 flex flex-col space-y-4">
              <div className="flex flex-wrap space-x-2 text-sm md:pt-4 md:text-base">
                <span>Commited Delivery:</span>
                {getStoreState.data?.window_time ? (
                  <>
                    <span>
                      {convertTo12HourFormat(
                        getStoreState.data.window_time.start_time
                      )}
                    </span>
                    <span>-</span>
                    <span>
                      {convertTo12HourFormat(
                        getStoreState.data.window_time.end_Time
                      )}
                    </span>
                  </>
                ) : (
                  <span>Can be delivered anytime</span>
                )}
              </div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  disabled={preview}
                  label="Delivery date and time"
                  views={["year", "month", "day", "hours", "minutes"]}
                  onChange={(date) => {
                    if (date) {
                      const formattedDate = dayjs(date).format(
                        "YYYY-MM-DD HH:mm:ss"
                      );

                      setCommitedDeliveryDate(formattedDate);
                    }
                  }}
                  value={dayjs(CommitedDeliveryDate)}
                  renderInput={(params) => (
                    <TextField required {...params} size="small" />
                  )}
                  minDate={dayjs()}
                  minTime={getTimeLimit("start")}
                  maxTime={getTimeLimit("end")}
                />
              </LocalizationProvider>
            </div>

            <div className="basis-full md:basis-1/2 space-y-3">
              {preview ? (
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ color: "white", backgroundColor: "#CC5801" }}
                >
                  Confirm
                </Button>
              ) : (
                <Button
                  disabled={isQuantityEmpty()}
                  fullWidth
                  variant="contained"
                  onClick={(event) => {
                    event.preventDefault();
                    setPreview(true);
                  }}
                  sx={{ color: "white", backgroundColor: "#CC5801" }}
                >
                  Preview
                </Button>
              )}

              <ButtonGroup fullWidth size="small" variant="text">
                <Button
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                >
                  <span className="text-primary underline">Cancel Order</span>
                </Button>

                {preview && (
                  <Button onClick={() => setPreview(false)}>
                    <span className="text-primary underline">Re-edit</span>
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </form>

      <PopupModal
        open={openPopup}
        title={preSubmitAlert ? "Confirmation!" : "Warning!"}
        message={
          preSubmitAlert
            ? "Are you sure you want to commit the order?"
            : "Are you sure you want to cancel the order?"
        }
        icon={<BsCheckCircleFill className="text-3xl text-[#00FA9A]" />}
        handleYesButton={preSubmitAlert ? handleOnSubmit : handleCancelledOrder}
        handleNoButton={() => {
          setOpenPopup(false);
        }}
      />
    </>
  );
}
