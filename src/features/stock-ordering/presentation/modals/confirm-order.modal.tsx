import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { Autocomplete, Button, TableRow, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { StockOrderConfirmTable } from "../components";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import { selectGetStockOrderStores } from "../slices/get-store.slice";
import { selectconfirmNewOrder } from "../slices/confirm-new-order.slice";
import { insertNewOrder } from "../slices/insert-new-order.slice";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { DeliverySchedule } from "features/stock-ordering/core/domain/delivery-schedule.model";
import { InsertNewOrderParam } from "features/stock-ordering/core/stock-ordering.params";

interface ConfirmOrdersModalProps {
  open: boolean;
  onClose: () => void;
}

interface TableRow {
  id: number;
  productId: string;
  productName: string;
  uom: string;
  cost: string;
  orderQty: string;
}

export function ConfirmOrdersModal(props: ConfirmOrdersModalProps) {
  const dispatch = useAppDispatch();

  const getStores = useAppSelector(selectGetStockOrderStores);
  const getOrderInformation = useAppSelector(selectconfirmNewOrder);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const [selectedStore, setSelectedStore] = useState<
    | {
        store_id: string;
        name: string;
      }
    | undefined
  >();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [category, setCategory] = useState<
    | {
        category_id: string;
        category_name: string;
      }
    | undefined
  >();
  const [isEdit, setIsEdit] = useState(false);
  const [isEditCancelled, setisEditCancelled] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [deliveryDate, setDeliveryData] = useState("");
  const [deliveryDateError, setDeliveryDateError] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [leadTime, setLeadTime] = useState<number>();

  const [rows, setRows] = useState<OrderTableData[]>([
    {
      productId: "",
      productName: "",
      uom: "",
      cost: "",
      orderQty: "",
    },
  ]);

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
      setRows([]);
    }
  }, [props.open]);

  const handleTableRows = (TableData: OrderTableData[]) => {
    setRows(TableData);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await dispatch(
      insertNewOrder({
        selectedStoreId: selectedStore?.store_id,
        deliveryScheduleData: deliveryDate,
        selectedAddress: getOrderInformation.data?.selectedAddress ?? "",
        remarks: remarks,
        user_id: getAdminSessionState.data?.admin.user_id ?? "",
        category: {
          category_id: category?.category_id ?? "",
          category_name: category?.category_name ?? "",
        },
        OrderData: rows,
      })
    );

    props.onClose();
  };

  useEffect(() => {
    if (isEditCancelled) {
      setRows(getOrderInformation.data?.OrderData ?? []);
      setisEditCancelled(false);
    }
  }, [isEditCancelled]);

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
        return dayIndex === 2 || dayIndex === 4 || dayIndex === 6;
      } else if (schedule.is_tths) {
        return dayIndex === 1 || dayIndex === 3 || dayIndex === 5;
      }
    }

    return false;
  };

  const isQuantityEmpty = () => {
    let empty = false;
    rows.map((product) => {
      if (product.orderQty === "") empty = true;
    });

    return empty;
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  console.log(deliveryDate);

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
            <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary">
              <StockOrderConfirmTable
                handleTableRows={handleTableRows}
                setCategory={setCategory}
                store={{
                  store_id: selectedStore?.name ?? "",
                  store_name: selectedStore?.store_id ?? "",
                }}
                isEditCancelled={isEditCancelled}
                isConfirmOrder={true}
                isEdit={isEdit}
              />

              <div className="space-y-5">
                <div className="px-5">
                  <div className="flex flex-row space-x-5">
                    <div className="basis-1/2 flex flex-col space-y-2">
                      <span>Select Store: </span>
                      <Autocomplete
                        id="stock-order-selected-store"
                        size="small"
                        disabled
                        options={
                          getStores.data
                            ? getStores.data.stores.map((row) => row.name)
                            : []
                        }
                        onChange={(event, value: any) => {
                          if (value && getStores.data) {
                            const selectedStoreObj = getStores.data.stores.find(
                              (store) => store.name === value
                            );
                            setSelectedStore(selectedStoreObj);
                          } else {
                            setSelectedStore(undefined);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            value={selectedStore ?? ""}
                            {...params}
                            label={
                              selectedStore?.name ?? "Select store to evaluate"
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="basis-1/2 flex flex-col space-y-2">
                      <span>Select Address: </span>
                      <Autocomplete
                        id="stock-order-selected-store"
                        size="small"
                        disabled={buttonDisable}
                        options={
                          getStores.data
                            ? getStores.data.ship_to_address.map(
                                (row) => row.ship_to_address
                              )
                            : []
                        }
                        onChange={(event, value: any) => {
                          setSelectedAddress(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            value={selectedAddress ?? ""}
                            {...params}
                            label={
                              selectedAddress ?? "Select address to deliver"
                            }
                          />
                        )}
                      />
                    </div>

                    <div className="basis-1/2 flex flex-col space-y-2">
                      <span>Delivery Date: </span>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Delivery date and time"
                          views={["year", "month", "day", "hours", "minutes"]}
                          onChange={(date) => {
                            if (date) {
                              const formattedDate = dayjs(date).format(
                                "YYYY-MM-DD HH:mm:ss"
                              );

                              if (dayjs(formattedDate).isValid()) {
                                setDeliveryData(formattedDate);

                                const isDateDisabled =
                                  deliverySchedules(formattedDate);
                                setDeliveryDateError(isDateDisabled);
                              } else {
                                setDeliveryDateError(true);
                              }
                            }
                          }}
                          value={dayjs(deliveryDate)}
                          renderInput={(params) => (
                            <TextField required {...params} size="small" />
                          )}
                          minDateTime={dayjs().add(leadTime ?? 2, "day")}
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

                  <div className="flex flex-row mt-5 space-x-5">
                    {isEdit ? (
                      <div className="basis-1/2 flex flex-row space-x-5">
                        <Button
                          onClick={() => {
                            setisEditCancelled(true);

                            setButtonDisable(true);
                            setIsEdit(false);
                          }}
                          className="basis-1/2"
                          fullWidth
                          variant="contained"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            setButtonDisable(true);
                            setIsEdit(false);
                          }}
                          className="basis-1/2"
                          fullWidth
                          variant="contained"
                        >
                          Confirm Edit
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setButtonDisable(false);
                          setIsEdit(true);
                        }}
                        className="basis-1/2"
                        fullWidth
                        variant="contained"
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      disabled={
                        isEdit || isQuantityEmpty() || deliveryDateError
                      }
                      type="submit"
                      className="basis-1/2"
                      fullWidth
                      variant="contained"
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
