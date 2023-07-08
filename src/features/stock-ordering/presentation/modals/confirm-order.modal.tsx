import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { Autocomplete, Button, TableRow, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { StockOrderConfirmTable } from "../components";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import {
  selectGetStockOrderStores,
  getStockOrderStores,
} from "../slices/get-store.slice";
import { selectconfirmNewOrder } from "../slices/confirm-new-order.slice";
import { insertNewOrder } from "../slices/insert-new-order.slice";

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

  const [selectedStore, setSelectedStore] = useState<
    | {
        store_id: string;
        name: string;
      }
    | undefined
  >();

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
  const [deliveryDate, setDeliveryData] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  const [availableDeliveryDay, setAvailableDeliveryDay] = useState<number>();

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
    dispatch(getStockOrderStores());
  }, [dispatch]);

  useEffect(() => {
    if (getOrderInformation.data) {
      const getSelectedStore = getStores.data?.stores.find((store) => {
        return store.store_id === getOrderInformation.data?.selectedStoreId;
      });

      setSelectedStore(getSelectedStore);
    }
  }, [props.open]);

  const handleTableRows = (
    TableData: OrderTableData[],
    avialableDelivery: number
  ) => {
    setRows(TableData);
    setAvailableDeliveryDay(avialableDelivery);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await dispatch(
      insertNewOrder({
        selectedStoreId: selectedStore?.store_id,
        deliverydate: deliveryDate,
        category: {
          category_id: category?.category_id ?? "",
          category_name: category?.category_name ?? "",
        },
        OrderData: rows,
      })
    );

    setRows([]);
    setDeliveryData(dayjs().format("YYYY-MM-DD HH:mm:ss"));

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
    const nearestDate = dayjs()
      .add(1, "week")
      .day(Number(availableDeliveryDay));
    return dayjs(date).isBefore(nearestDate);
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
                        disabled={buttonDisable}
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

                              setDeliveryData(formattedDate);
                            }
                          }}
                          value={dayjs(deliveryDate)}
                          renderInput={(params) => (
                            <TextField required {...params} size="small" />
                          )}
                          minDateTime={dayjs().subtract(10, "seconds")}
                          shouldDisableDate={deliverySchedules}
                        />
                      </LocalizationProvider>
                    </div>
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
                      disabled={isEdit}
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
