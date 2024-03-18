import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import {
  TextField,
  Button,
  ButtonGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StockOrderRemarks } from "./stock-order-remarks";
import { useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetStockOrderStores } from "../slices/get-store.slice";
import {
  newOrdersParam,
  updateCancelledStatus,
} from "features/stock-ordering/core/stock-ordering.params";
import { updateOrderCancelled } from "../slices/update-order-cancelled.slice";
import { updateNewOrders } from "../slices/update-new-order.slice";
import { isQuantityEmpty } from "./stock-ordering-utils";
import {
  openMessageModal,
  closeMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";

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
  const [payFirstCheck, setPayFirstCheck] = useState<boolean>(false);

  const handleSubmitOrder = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(
      openMessageModal({
        message: "Are you sure you want to commit the order?",
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
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
                penalty: payFirstCheck,
              };

              dispatch(updateNewOrders(reviewOrdersParamData));

              props.onClose(true);
              document.body.classList.remove("overflow-hidden");
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

    props.onClose(true);
    document.body.classList.remove("overflow-hidden");
    dispatch(closeMessageModal());
  };

  const handleOnclickCancel = () => {
    dispatch(
      openMessageModal({
        message: "Are you sure you want to cancel?",
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
              handleCancelledOrder();
              // props.onClose(true);
              // document.body.classList.remove("overflow-hidden");
              // dispatch(closeMessageModal());
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

  const handlePayFirstSwitch = (event: {
    preventDefault: () => void;
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    event.preventDefault();
    setPayFirstCheck(event.target.checked);
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

  return (
    <>
      <form onSubmit={handleSubmitOrder}>
        <div className="px-2 space-y-3">
          <div>
            <FormControlLabel
              control={
                <Switch value={payFirstCheck} onChange={handlePayFirstSwitch} />
              }
              label={
                "By turning this on, it will force the store to pay first before delivery"
              }
            />
          </div>

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
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ color: "white", backgroundColor: "#CC5801" }}
                disabled={
                  isQuantityEmpty(
                    props.rows.product_data,
                    props.rows.order_information.status_id
                  ) || CommitedDeliveryDate === null
                }
              >
                Confirm
              </Button>

              <ButtonGroup fullWidth size="small" variant="text">
                <Button onClick={handleOnclickCancel}>
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
    </>
  );
}
