import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { Autocomplete, Button, TableRow, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { OrderPlaceAndConfirmTable } from "../components";
import {
  getStockOrderStores,
  selectGetStockOrderStores,
} from "../slices/get-store.slice";
import { insertNewOrder } from "../slices/insert-new-order.slice";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import {
  confirmNewOrder,
  selectconfirmNewOrder,
} from "../slices/confirm-new-order.slice";

interface PlaceOrdersModalProps {
  open: boolean;
  onClose: () => void;
  openConfirmationState: (value: boolean) => void;
}

export function PlaceOrderModal(props: PlaceOrdersModalProps) {
  const dispatch = useAppDispatch();

  const getStores = useAppSelector(selectGetStockOrderStores);

  const [selectedStore, setSelectedStore] = useState<
    | {
        store_id: string;
        name: string;
      }
    | undefined
  >();
  const [isDisabled, setDisabled] = useState(false);
  const [deliveryDate, setDeliveryData] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  const [category, setCategory] = useState("");
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // dispatch(
    //   insertNewOrder({
    // selectedStoreId: selectedStore?.store_id,
    // deliverydate: deliveryDate,
    // category: category,
    // OrderData: rows,
    //   })
    // );

    dispatch(
      confirmNewOrder({
        data: {
          selectedStoreId: selectedStore?.store_id,
          deliverydate: deliveryDate,
          category: category,
          OrderData: rows,
        },
      })
    );

    props.openConfirmationState(true);
  };

  const handleTableRows = (TableData: OrderTableData[]) => {
    setRows(TableData);
  };

  useEffect(() => {
    dispatch(getStockOrderStores());
  }, [dispatch]);

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
            <span className="text-2xl text-white">Place Order</span>
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
            <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
              <div className="flex flex-row space-x-5">
                <div className="basis-1/2 flex flex-col space-y-2">
                  <span>Select Store: </span>
                  <Autocomplete
                    id="stock-order-selected-store"
                    size="small"
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
                        label="Select store to evaluate"
                      />
                    )}
                  />
                </div>

                <div className="basis-1/2 flex flex-col space-y-2">
                  <span>Delivery Date: </span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
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
                          const formattedDate =
                            dayjs(date).format("MMMM DD, YYYY");

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

              <OrderPlaceAndConfirmTable
                isDisabled={false}
                handleTableRows={handleTableRows}
                setCategory={setCategory}
              />
              <div className="px-5">
                <div className="mt-5">
                  <Button
                    disabled={isDisabled}
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
