import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import React, { useState } from "react";
import { StockOrderRemarks } from "./stock-order-remarks";
import { TextField, Button, IconButton } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { MdPreview } from "react-icons/md";
import dayjs from "dayjs";
import { PopupModal, UploadDeliveryRecieptModal } from "../modals";
import { receiveOrdersParam } from "features/stock-ordering/core/stock-ordering.params";
import { updateReceiveOrders } from "../slices/update-receive-order.slice";
import { useAppDispatch } from "features/config/hooks";
import { isQuantityEmpty, isValidFile } from "./stock-ordering-utils";

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

  const [openPopupModal, setOpenPopupModal] = useState(false);
  const [openUploadDeliveryRecieptModal, setOpenUploadDeliveryRecieptModal] =
    useState(false);

  const handleSubmitOrder = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (isValidFile(uploadedReceipt, true)) {
      setOpenPopupModal(true);
    } else {
      setOpenUploadDeliveryRecieptModal(true);
    }
  };

  const handleStoreRecieveOrder = () => {
    const receieveOrdersProductDataParam: receiveOrdersParam["product_data"] =
      props.rows?.product_data.map(
        (product: { id: any; product_id: any; delivered_qty: any }) => ({
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
  };

  return (
    <>
      <form onSubmit={handleSubmitOrder}>
        <div className="px-2 space-y-3">
          <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />

          <div className="flex flex-col md:flex-row md:space-x-3 space-y-4 mt-2">
            <div className="md:basis-1/2 flex flex-col space-y-2">
              <span>Actual Delivery Date: </span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Delivery date and time"
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
                    <TextField required {...params} size="small" />
                  )}
                />
              </LocalizationProvider>
            </div>

            <div className="md:basis-1/2 flex items-stretch">
              <div
                className={`${
                  isValidFile(uploadedReceipt, true)
                    ? "basis-4/5"
                    : "basis-full"
                } "flex self-end space-x-5"`}
              >
                <Button
                  disabled={isQuantityEmpty(
                    props.rows.product_data,
                    props.rows.order_information.status_id
                  )}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={STOCK_ORDERING_BUTTON_STYLE}
                >
                  Confirm
                </Button>
              </div>

              {isValidFile(uploadedReceipt, true) ? (
                <div className="basis-1/5 flex  justify-center items-stretch">
                  <div className="self-end">
                    <IconButton
                      onClick={() => setOpenUploadDeliveryRecieptModal(true)}
                    >
                      <MdPreview className=" text-3xl" />
                    </IconButton>
                  </div>
                </div>
              ) : null}
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

      <PopupModal
        open={openPopupModal}
        title={"Confirmation"}
        message={
          <span>
            By clicking <span className="font-semibold">'YES'</span>, you
            confirm that the products are complete and in good condition.
          </span>
        }
        handleYesButton={handleStoreRecieveOrder}
        handleNoButton={() => setOpenPopupModal(false)}
      />
    </>
  );
}
