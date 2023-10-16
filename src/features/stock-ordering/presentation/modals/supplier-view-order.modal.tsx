import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TextField, Button, ButtonGroup } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  GetProductDataState,
  getProductData,
  selectGetProductData,
} from "../slices/get-product-data.slice";
import { newOrdersParam } from "features/stock-ordering/core/stock-ordering.params";
import { updateNewOrders } from "../slices/update-new-order.slice";
import { StockOrderingWatingSkeleton } from "../components";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import {
  getStockOrderStores,
  selectGetStockOrderStores,
} from "../slices/get-store.slice";
import { createQueryParams } from "features/config/helpers";
import { AiOutlineDownload } from "react-icons/ai";
import { PopupModal } from ".";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { productDataInitialState } from "features/stock-ordering/core/productDataInitialState";
import {
  REACT_APP_DOMAIN_URL,
  STOCK_ORDERING_BUTTON_STYLE,
} from "features/shared/constants";

interface PlaceOrdersModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function SupplierViewOrderModal(props: PlaceOrdersModalProps) {
  const dispatch = useAppDispatch();

  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getStoreState = useAppSelector(selectGetStockOrderStores);
  const getProductDataState = useAppSelector(selectGetProductData);

  const [remarks, setRemarks] = useState("");
  const [preview, setPreview] = useState(false);
  const [CommitedDeliveryDate, setCommitedDeliveryDate] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );
  const [openPopUp, setOpenPopUp] = useState(false);

  const [rows, setRows] = useState<GetProductDataModel | undefined>(
    productDataInitialState
  );

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const reviewOrdersProductDataParam: newOrdersParam["product_data"] =
      rows?.product_data.map((productsItem) => ({
        id: productsItem.id,
        productId: productsItem.product_id,
        commitedQuantity: productsItem.commited_qty,
        out_of_stock: productsItem.out_of_stock,
      })) ?? [];

    const reviewOrdersParamData: newOrdersParam = {
      id: props.id,
      commitedDelivery: CommitedDeliveryDate,
      remarks: remarks,
      product_data: reviewOrdersProductDataParam,
    };

    dispatch(updateNewOrders(reviewOrdersParamData));

    document.body.classList.remove("overflow-hidden");
    props.onClose();
  };

  const handleCancelledOrder = async () => {
    setOpenPopUp(true);
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

  useEffect(() => {
    if (props.id && props.open) {
      dispatch(getProductData({ orderId: props.id }));
      setCommitedDeliveryDate(dayjs().format("YYYY-MM-DD HH:mm:ss"));
      setRemarks("");
      setPreview(false);
      setOpenPopUp(false);
    }
    setRows(undefined);
  }, [dispatch, props.open, props.id, props.currentTab]);

  useEffect(() => {
    if (
      GetProductDataState.success === getProductDataState.status &&
      getProductDataState.data
    ) {
      setRows(getProductDataState.data);
    }
  }, [getProductDataState]);

  // useEffect(() => {
  //   if (rows?.order_information.store_id && props.open) {
  //     const query = createQueryParams({
  //       store_id: rows.order_information.store_id,
  //     });

  //     dispatch(getStockOrderStores(query));
  //   }
  // }, [rows?.order_information]);

  const isQuantityEmpty = () => {
    let empty = false;
    rows?.product_data.map((product) => {
      if (product.commited_qty === "" || product.commited_qty === null) {
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

            <div className="space-x-3">
              {/* Download button */}
              <button
                className="text-2xl text-white"
                onClick={() => {
                  const link = `${REACT_APP_DOMAIN_URL}api/stock/export-order-pdf/${props.id}`;
                  window.open(link, "_blank");

                  document.body.classList.remove("overflow-hidden");
                  props.onClose();
                }}
              >
                <AiOutlineDownload />
              </button>

              {/* close */}
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
          </div>
          <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
            {rows ? (
              <form className="overflow-auto" onSubmit={handleSubmit}>
                <StockOrderTable
                  isCommitedTextFieldAvailable={setEnabled() && !preview}
                  enableTableEdit={setEnabled()}
                  activeTab={props.currentTab}
                  setRows={setRows}
                  rowData={rows}
                />

                {setEnabled() ? (
                  <div className="px-2 space-y-3">
                    <div className="flex flex-col mt-2">
                      <span>Remarks: </span>
                      <TextField
                        value={remarks}
                        onChange={(event) => setRemarks(event.target.value)}
                        inputProps={{ maxLength: 512 }}
                        multiline
                      />
                    </div>
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
                          <Button onClick={handleCancelledOrder}>
                            <span className="text-primary underline">
                              Cancel Order
                            </span>
                          </Button>

                          {preview && (
                            <Button onClick={() => setPreview(false)}>
                              <span className="text-primary underline">
                                Re-edit
                              </span>
                            </Button>
                          )}
                        </ButtonGroup>
                      </div>
                    </div>
                  </div>
                ) : null}
              </form>
            ) : (
              <>
                {setEnabled() ? (
                  <StockOrderingWatingSkeleton
                    remarks
                    firstDoubleComponents
                    secondDoubleComponents
                  />
                ) : (
                  <StockOrderingWatingSkeleton />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* <PopupModal
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        title={"Cancel Order"}
        message={"Are you sure you want to cancel your order?"}
        remarks={remarks}
        id={props.id}
        cancelOrder
        orderCancelled={(isCancelled: boolean) =>
          isCancelled && props.onClose()
        }
      /> */}
    </>
  );
}
