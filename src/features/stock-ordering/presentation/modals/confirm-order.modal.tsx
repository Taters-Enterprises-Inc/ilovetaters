import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { StockOrderConfirmTable } from "../components";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import { selectGetStockOrderStores } from "../slices/get-store.slice";
import { selectconfirmNewOrder } from "../slices/confirm-new-order.slice";
import {
  InsertNewOrderState,
  insertNewOrder,
  resetInsertNewOrder,
  selectInsertNewOrder,
} from "../slices/insert-new-order.slice";
import { DeliverySchedule } from "features/stock-ordering/core/domain/delivery-schedule.model";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";

interface ConfirmOrdersModalProps {
  open: boolean;
  onClose: () => void;
}

interface selectedStore {
  store_id: string;
  name: string;
}

interface category {
  category_id: string;
  category_name: string;
}

export function ConfirmOrdersModal(props: ConfirmOrdersModalProps) {
  const dispatch = useAppDispatch();

  const getStores = useAppSelector(selectGetStockOrderStores);
  const getOrderInformation = useAppSelector(selectconfirmNewOrder);
  const insertNewUserState = useAppSelector(selectInsertNewOrder);

  const [selectedStore, setSelectedStore] = useState<selectedStore>();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [category, setCategory] = useState<category>();
  const [isEdit, setIsEdit] = useState(false);
  const [isEditCancelled, setisEditCancelled] = useState(false);
  const [deliveryDate, setDeliveryData] = useState("");
  const [deliveryDateError, setDeliveryDateError] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [leadTime, setLeadTime] = useState<number>();
  const [rows, setRows] = useState<OrderTableData[]>([]);

  useEffect(() => {
    if (getOrderInformation.data) {
      const getSelectedStore = getStores.data?.stores.find((store) => {
        return store.store_id === getOrderInformation.data?.selectedStoreId;
      });
      setLeadTime(0);
      setSelectedAddress(getOrderInformation.data.selectedAddress ?? "");
      setSelectedStore(getSelectedStore);
      setDeliveryData("");
      setRemarks("");
      setIsEdit(false);
      setRows([]);
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
        deliveryScheduleData: deliveryDate,
        selectedAddress: getOrderInformation.data?.selectedAddress ?? "",
        remarks: remarks,
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

  const deliverySchedules = (
    date: string | number | Date | dayjs.Dayjs | null | undefined
  ) => {
    const dayIndex = dayjs(date).day();
    const schedule: DeliverySchedule = getOrderInformation.data
      ?.deliveryScheduleData as DeliverySchedule;

    if (!schedule?.is_mwf && !schedule?.is_tths) {
      setLeadTime(Number(schedule?.leadtime));
    } else {
      if (dayjs(date).isBefore(schedule.cutoff)) {
        setLeadTime(Number(schedule.leadtime));
      } else {
        setLeadTime(Number(schedule.leadtime) + 2);
      }

      if (schedule.is_mwf) {
        return (
          dayIndex === 2 || dayIndex === 4 || dayIndex === 6 || dayIndex === 0
        );
      } else if (schedule.is_tths) {
        return (
          dayIndex === 1 || dayIndex === 3 || dayIndex === 5 || dayIndex === 0
        );
      }
    }

    return false;
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
                          value={dayjs(deliveryDate)}
                          renderInput={(params) => (
                            <TextField required {...params} size="small" />
                          )}
                          minDate={dayjs().add(leadTime ?? 2, "day")}
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
                      <>
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
                          Confirm
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
