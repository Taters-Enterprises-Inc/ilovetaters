import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { StockOrderTable } from "../components";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import { selectGetStockOrderStores } from "../slices/get-store.slice";
import { selectconfirmNewOrder } from "../slices/confirm-new-order.slice";

interface TableRow {
  id: number;
  productId: string;
  productName: string;
  uom: string;
  cost: string;
  orderQty: string;
  currentStock: string;
  commitedQuantity: string;
  deliveredQuantity: string;
}

interface StoreRecieveOrderModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
}

export function StoreRecieveOrderModal(props: StoreRecieveOrderModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [buttonDisable, setButtonDisable] = useState(false);
  const [actualDeliveryDate, setActualDeliveryDate] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );
  const [isDeliveredQtyAvailable, setIsDeliveredQtyAvailable] = useState(true);

  const [rows, setRows] = useState<TableRow[]>([
    {
      id: 1,
      productId: "-",
      productName: "-",
      uom: "-",
      cost: "-",
      orderQty: "-",
      currentStock: "-",
      commitedQuantity: "-",
      deliveredQuantity: "",
    },
  ]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsDeliveredQtyAvailable(false);
    setButtonDisable(true);
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Store Recieve Orders</span>
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
              <StockOrderTable
                isCommitedTextFieldAvailable={false}
                isStore={true}
                activeTab={props.currentTab}
                setRows={setRows}
                rowData={rows}
                isDeliveredQtyAvailable={isDeliveredQtyAvailable}
              />

              <div className="space-y-5">
                <div className="px-5">
                  <div className="flex flex-row space-x-5">
                    <div className="basis-1/2 flex flex-col space-y-2">
                      <span>Actual Delivery Date: </span>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          disabled={buttonDisable}
                          label="Delivery date"
                          views={["month", "day", "year"]}
                          onChange={(date) => {
                            if (date) {
                              const formattedDate = dayjs(date).format(
                                "YYYY-MM-DD 00:00:00"
                              );

                              setActualDeliveryDate(formattedDate);
                            }
                          }}
                          value={dayjs(actualDeliveryDate)}
                          renderInput={(params) => (
                            <TextField required {...params} size="small" />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="basis-1/2 flex items-stretch space-x-5 pb-1">
                      {buttonDisable ? null : (
                        <Button
                          className="self-end"
                          type="submit"
                          fullWidth
                          variant="contained"
                        >
                          Confirm
                        </Button>
                      )}
                    </div>
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
