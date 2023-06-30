import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { Autocomplete, Button, TableRow, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { OrderPlaceAndConfirmTable } from "../components";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import {
  selectGetStockOrderStores,
  getStockOrderStores,
} from "../slices/get-store.slice";
import { selectconfirmNewOrder } from "../slices/confirm-new-order.slice";
import { insertNewOrder } from "../slices/insert-new-order.slice";
import { store } from "features/config/store";
import { getStockOrderProducts } from "../slices/get-products.slice";

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
  const navigate = useNavigate();

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
  const [isDisabled, setDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditCancelled, setisEditCancelled] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [deliveryDate, setDeliveryData] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  const [rows, setRows] = useState<OrderTableData[]>([
    {
      id: 1,
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

      setDeliveryData(getOrderInformation.data.deliverydate);
      setSelectedStore(getSelectedStore);
    }
  }, [props.open]);

  const handleTableRows = (TableData: OrderTableData[]) => {
    setRows(TableData);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(
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

    props.onClose();

    navigate("/admin/stock-order/order/store/view");
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  console.log(rows);

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
              <OrderPlaceAndConfirmTable
                isDisabled={buttonDisable}
                handleTableRows={handleTableRows}
                setCategory={setCategory}
                store={{
                  store_id: selectedStore?.name ?? "",
                  store_name: selectedStore?.store_id ?? "",
                }}
                isEditCancelled={isEditCancelled}
                isConfirmOrder={true}
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
                        <DatePicker
                          disabled={buttonDisable}
                          label="Delivery date"
                          views={["month", "day", "year"]}
                          onError={() => setDisabled(true)}
                          onAccept={(value) => {
                            if (dayjs(value)) {
                              setDisabled(false);
                            }
                          }}
                          onChange={(date) => {
                            if (date) {
                              const formattedDate = dayjs(date).format(
                                "YYYY-MM-DD 00:00:00"
                              );

                              setDeliveryData(formattedDate);
                            }
                          }}
                          value={dayjs(deliveryDate)}
                          renderInput={(params) => (
                            <TextField required {...params} size="small" />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="flex flex-row mt-5 space-x-5">
                    {isEdit ? (
                      <div className="basis-1/2 flex flex-row space-x-5">
                        <Button
                          onClick={() => {
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
                            setisEditCancelled(true);
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
                        Edit{" "}
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
