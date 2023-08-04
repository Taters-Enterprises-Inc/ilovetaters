import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { selectGetProductData } from "../slices/get-product-data.slice";
import {
  newOrdersParam,
  updateCancelledStatus,
  updateStatus,
} from "features/stock-ordering/core/stock-ordering.params";
import { updateNewOrders } from "../slices/update-new-order.slice";
import { InitializeModal, InitializeProductData } from "../components";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { get } from "http";
import { updateOrderCancelled } from "../slices/update-order-cancelled.slice";
import {
  getStockOrderStores,
  selectGetStockOrderStores,
} from "../slices/get-store.slice";
import { createQueryParams } from "features/config/helpers";

interface PlaceOrdersModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function SupplierViewOrderModal(props: PlaceOrdersModalProps) {
  const dispatch = useAppDispatch();

  const getProductDataState = useAppSelector(selectGetProductData);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getStoreState = useAppSelector(selectGetStockOrderStores);
  const [remarks, setRemarks] = useState("");
  const [preview, setPreview] = useState(false);
  const [CommitedDeliveryDate, setCommitedDeliveryDate] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  const [rows, setRows] = useState<TableRow>({
    order_information: {
      store_name: "",
      store_id: "",
      ship_to_address: "",
      order_number: "",
      requested_delivery_date: "",
      commited_delivery_date: "",
      order_reviewed_date: "",
      order_confirmation_date: "",
      view_delivery_receipt: "",
      dispatch_date: "",
      order_enroute: "",
      actual_delivery_date: "",
      view_updated_delivery_receipt: "",
      billing_information_ready: false,
      view_payment_details: "",
      payment_confirmation: "",
      transport_route: "",
      region_id: 0,
      remarks: [],
    },
    product_data: [],
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const reviewOrdersProductDataParam: newOrdersParam["product_data"] =
      rows.product_data.map((productsItem, index) => ({
        id: productsItem.id,
        productId: productsItem.productId,
        commitedQuantity: productsItem.commitedQuantity,
      }));

    const reviewOrdersParamData: newOrdersParam = {
      id: props.id,
      commitedDelivery: CommitedDeliveryDate,
      remarks: remarks,
      product_data: reviewOrdersProductDataParam,
    };

    await dispatch(updateNewOrders(reviewOrdersParamData));

    props.onClose();
  };

  const handleCancelledOrder = async () => {
    const cancelParameter: updateCancelledStatus = {
      id: props.id,
      remarks: remarks,
    };

    await dispatch(updateOrderCancelled(cancelParameter));

    props.onClose();
  };

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 1) {
        result = true;
      }
    });

    return result;
  };

  InitializeModal({
    setRows: setRows,
    id: props.id,
    open: props.open,
  });

  InitializeProductData({
    setRows: setRows,
    productData: getProductDataState.data
      ? getProductDataState.data
      : undefined,
  });

  useEffect(() => {
    setCommitedDeliveryDate(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    setRemarks("");
    setPreview(false);
  }, [props.open]);

  useEffect(() => {
    if (rows.order_information) {
      const query = createQueryParams({
        store_id: rows.order_information.store_id,
      });

      dispatch(getStockOrderStores(query));
    }
  }, [rows.order_information]);

  const isQuantityEmpty = () => {
    let empty = false;
    rows.product_data.map((product) => {
      if (
        product.commitedQuantity === "" ||
        product.commitedQuantity === null
      ) {
        empty = true;
      }
    });

    return empty;
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
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Supplier View Order </span>

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

          <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
            <form className="overflow-auto" onSubmit={handleSubmit}>
              <StockOrderTable
                isCommitedTextFieldAvailable={setEnabled() && !preview}
                isStore={false}
                activeTab={props.currentTab}
                setRows={setRows}
                rowData={rows}
                isDeliveredQtyAvailable={false}
                isDispatchedQtyAvailable={false}
              />

              {setEnabled() ? (
                <div className="px-2">
                  <div className="flex flex-col mt-2">
                    <span>Remarks: </span>
                    <TextField
                      value={remarks}
                      onChange={(event) => setRemarks(event.target.value)}
                      inputProps={{ maxLength: 512 }}
                      multiline
                    />
                  </div>
                  <div className="flex pt-5 space-x-5">
                    <div className="basis-1/2 flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <span className="font-normal">Commited Delivery:</span>
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

                    <div className="basis-1/2">
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
                      <Button
                        fullWidth
                        variant="text"
                        size="small"
                        onClick={handleCancelledOrder}
                      >
                        <span className="text-primary underline">
                          Cancel Order
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
