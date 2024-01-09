import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  LocalizationProvider,
  DatePicker,
  DesktopDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { StockOrderConfirmTable } from "../components";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import { selectGetStockOrderStores } from "../slices/get-store.slice";
import { selectconfirmNewOrder } from "../slices/confirm-new-order.slice";
import { insertNewOrder } from "../slices/insert-new-order.slice";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import {
  GetDeliveryScheduleState,
  getDeliverySchedule,
  selectGetDeliverySchedule,
} from "../slices/get-delivery-schedule.slice";
import { PopupModal } from "./popup.modal";
import { TbUrgent } from "react-icons/tb";
import { truncateSync } from "fs";
import {
  categoryModel,
  selectedStoreModel,
} from "features/stock-ordering/core/domain/store-and-category.model";

interface ConfirmOrdersModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConfirmOrdersModal(props: ConfirmOrdersModalProps) {
  const dispatch = useAppDispatch();

  const getStores = useAppSelector(selectGetStockOrderStores);
  const getOrderInformation = useAppSelector(selectconfirmNewOrder);
  const getDeliveryScheduleState = useAppSelector(selectGetDeliverySchedule);

  const [selectedStore, setSelectedStore] = useState<selectedStoreModel>();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [category, setCategory] = useState<categoryModel>();
  const [deliveryDate, setDeliveryData] = useState<string | null>("");
  const [remarks, setRemarks] = useState("");
  const [rows, setRows] = useState<OrderTableData[]>([]);
  const [logisticType, setLogisticType] = useState<{
    id: string | null | undefined;
    name: string | null | undefined;
  }>();

  const [isEdit, setIsEdit] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [deliveryDateError, setDeliveryDateError] = useState(false);
  const [isEditCancelled, setisEditCancelled] = useState(false);
  const [emergencyOrderEnabled, setEmergencyOrderEnabled] = useState(false);

  useEffect(() => {
    if (getOrderInformation.data) {
      const getSelectedStore = getStores.data?.stores.find((store) => {
        return store.store_id === getOrderInformation.data?.selectedStoreId;
      });

      setSelectedAddress(getOrderInformation.data.selectedAddress ?? "");
      setSelectedStore(getSelectedStore);
      setDeliveryData("");
      setRemarks("");
      setRows([]);
      setIsEdit(false);
      setLogisticType(undefined);
      setEmergencyOrderEnabled(false);
      dispatch(getDeliverySchedule());
    }
  }, [props.open]);

  useEffect(() => {
    if (isEditCancelled) {
      setRows(getOrderInformation.data?.OrderData ?? []);
      setisEditCancelled(false);
    }
  }, [isEditCancelled]);

  const handleTableRows = (TableData: OrderTableData[]) => {
    setRows(TableData);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(
      insertNewOrder({
        selectedStoreId: selectedStore?.store_id,
        deliveryScheduleData: deliveryDate ?? "",
        selectedAddress: getOrderInformation.data?.selectedAddress ?? "",
        remarks: remarks,
        logisticType: emergencyOrderEnabled ? logisticType?.id ?? "" : "",
        category: {
          category_id: category?.category_id ?? "",
          category_name: category?.category_name ?? "",
        },
        OrderData: rows,
      })
    );

    document.body.classList.remove("overflow-hidden");
    props.onClose();
  };

  const schedule = getDeliveryScheduleState.data?.find(
    (item) => item.store_id === selectedStore?.store_id
  );

  useEffect(() => {
    if (
      GetDeliveryScheduleState.success === getDeliveryScheduleState.status &&
      schedule === undefined &&
      props.open
    ) {
      setOpenPopup(true);
    }
  }, [schedule, getDeliveryScheduleState]);

  const deliverySchedules = (
    date: string | number | Date | dayjs.Dayjs | null | undefined
  ) => {
    const dayIndex = dayjs(date).day();

    if (schedule?.is_mwf && !emergencyOrderEnabled) {
      return (
        dayIndex === 2 || dayIndex === 4 || dayIndex === 6 || dayIndex === 0
      );
    } else if (schedule?.is_tths) {
      return (
        dayIndex === 1 || dayIndex === 3 || dayIndex === 5 || dayIndex === 0
      );
    }

    return false;
  };

  const handleLeadTime = () => {
    const targetTime = dayjs()
      .set("hour", 14)
      .set("minute", 0)
      .set("second", 0);
    if (!emergencyOrderEnabled) {
      if (dayjs().isBefore(targetTime)) {
        return Number(schedule?.leadtime);
      } else {
        return Number(schedule?.leadtime) + 1;
      }
    } else {
      return 0;
    }
  };

  const isQuantityEmpty = () => {
    let empty = false;
    rows.map((product) => {
      if (
        product.orderQty === "" ||
        product.orderQty === "0" ||
        deliveryDate === ""
      )
        empty = true;
    });

    return empty;
  };

  const editProduct = () => {
    setIsEdit(true);
  };

  const handleCancelButton = () => {
    setisEditCancelled(true);
    setIsEdit(false);
  };

  const handleConfirmEdit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsEdit(false);
  };

  const handleEmergencyButton = () => {
    setDeliveryData(null);
    setLogisticType(undefined);
    if (emergencyOrderEnabled) {
      setEmergencyOrderEnabled(false);
    } else {
      setEmergencyOrderEnabled(true);
      setOpenPopup(true);
    }
  };

  const handleRequestedDeliveryDate = (
    date: string | number | Date | dayjs.Dayjs | null | undefined
  ) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");

      if (dayjs(formattedDate).isValid()) {
        setDeliveryData(formattedDate);

        const isDateDisabled = deliverySchedules(formattedDate);
        setDeliveryDateError(isDateDisabled);
      } else {
        setDeliveryDateError(true);
      }
    }
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  console.log(logisticType);

  return (
    <>
      <div
        id="place-order-modal"
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Order Confirmation</span>
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

          <form onSubmit={handleSubmit}>
            <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 space-y-5 border-secondary">
              <StockOrderConfirmTable
                handleTableRows={handleTableRows}
                setCategory={setCategory}
                category={{
                  category_id: category?.category_id ?? "",
                  category_name: category?.category_name ?? "",
                }}
                store={{
                  store_id: selectedStore?.name ?? "",
                  store_name: selectedStore?.store_id ?? "",
                }}
                isEditCancelled={isEditCancelled}
                isConfirmOrder={true}
                isEdit={isEdit}
              />
              {getStores.data && (
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row md:space-x-3">
                    <div className="md:basis-1/3 flex flex-col space-y-2">
                      <span>Select Store: </span>

                      <TextField
                        disabled
                        id="stock-order-selected-store"
                        size="small"
                        required
                        value={selectedStore?.name ?? ""}
                      />
                    </div>

                    <div className="md:basis-1/3 flex flex-col space-y-2">
                      <span>Select Address: </span>
                      <MaterialInputAutoComplete
                        colorTheme={"black"}
                        disabled={!isEdit}
                        required={true}
                        fullWidth={true}
                        size={"small"}
                        options={getStores.data?.address}
                        getOptionLabel={(option) =>
                          option.ship_to_address || ""
                        }
                        value={selectedAddress}
                        label={"Ship to"}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        onChange={(event, value) => {
                          setSelectedAddress(value);
                        }}
                      />
                    </div>

                    <div className="md:basis-1/3 flex flex-col space-y-2">
                      <span>Delivery Date: </span>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Delivery date"
                          views={["year", "month", "day"]}
                          onChange={handleRequestedDeliveryDate}
                          value={deliveryDate ? dayjs(deliveryDate) : null}
                          renderInput={(params) => (
                            <TextField
                              id="requestedDedliveryDate"
                              required
                              {...params}
                              size="small"
                            />
                          )}
                          minDate={dayjs().add(handleLeadTime(), "day")}
                          shouldDisableDate={deliverySchedules}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className="flex flex-col mt-2 ">
                    <span>Remarks: </span>
                    <TextField
                      value={remarks}
                      onChange={(event) => setRemarks(event.target.value)}
                      inputProps={{ maxLength: 512 }}
                      multiline
                    />
                  </div>

                  <div className="flex space-x-3">
                    {isEdit ? (
                      <>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={handleCancelButton}
                          sx={STOCK_ORDERING_BUTTON_STYLE}
                        >
                          Cancel
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          disabled={!selectedAddress ? true : false}
                          onClick={handleConfirmEdit}
                          sx={STOCK_ORDERING_BUTTON_STYLE}
                        >
                          Confirm Edit
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col space-y-2 w-full">
                        <div className="flex space-x-3">
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={editProduct}
                            sx={STOCK_ORDERING_BUTTON_STYLE}
                          >
                            Edit
                          </Button>

                          <Button
                            fullWidth
                            variant="contained"
                            disabled={isQuantityEmpty() || deliveryDateError}
                            type="submit"
                            sx={STOCK_ORDERING_BUTTON_STYLE}
                          >
                            {emergencyOrderEnabled
                              ? "Emergency Confirm"
                              : "Confirm"}
                          </Button>
                          <IconButton
                            onClick={handleEmergencyButton}
                            aria-label="emergency-button"
                          >
                            <TbUrgent
                              className={`${
                                emergencyOrderEnabled ? "text-primary" : ""
                              }`}
                            />
                          </IconButton>
                        </div>
                        {emergencyOrderEnabled && logisticType && (
                          <div className="flex justify-between space-x-3 ">
                            <div>
                              <span className="font-bold">Note: </span>
                              <span>
                                For delivery logistic type, additional fees will
                                be applied
                              </span>
                            </div>
                            <div>
                              <span className="font-bold">Logistic type: </span>
                              <span>{logisticType?.name}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div></div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <PopupModal
        open={openPopup}
        title={
          emergencyOrderEnabled ? "Select logistic type" : "Can't create order"
        }
        message={
          emergencyOrderEnabled
            ? "Note: Selecting delivery as logistic applies delivery charge"
            : "Looks like your store is not register on delivery schedule. Please contact TEI MIS Department."
        }
        okayButton={!emergencyOrderEnabled}
        handleOkayButton={() => {
          setOpenPopup(false);
          props.onClose();
        }}
        handleNoButton={() => {
          setOpenPopup(false);
          setDeliveryData(null);
          setLogisticType(undefined);
          setEmergencyOrderEnabled(false);
        }}
        handleYesButton={() => setOpenPopup(false)}
      >
        {emergencyOrderEnabled && (
          <MaterialInputAutoComplete
            colorTheme={"black"}
            required
            fullWidth
            size={"small"}
            options={[
              { id: "1", name: "Delivery" },
              { id: "2", name: "Pick-up" },
            ]}
            getOptionLabel={(option) => option.name || ""}
            value={logisticType}
            label={"Logistic Type"}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, value) => {
              setLogisticType(value);
            }}
          />
        )}
      </PopupModal>
    </>
  );
}
