import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";

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

interface PlaceOrdersModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
}

export function SupplierViewOrderModal(props: PlaceOrdersModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isDisabled, setDisabled] = useState(false);
  const [isCommitedTextFieldAvailable, setIsCommitedTextFieldAvailable] =
    useState(true);
  const [CommitedDeliveryDate, setCommitedDeliveryDate] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  const [rows, setRows] = useState<TableRow[]>([
    {
      id: 1,
      productId: "-",
      productName: "-",
      uom: "-",
      cost: "-",
      orderQty: "-",
      currentStock: "-",
      commitedQuantity: "0",
      deliveredQuantity: "-",
    },
  ]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setIsCommitedTextFieldAvailable(false);
    setDisabled(true);
    //CommitedDeliveryDate
    //rows

    // props.onClose();
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
            <span className="text-2xl text-white">Supplier View Order</span>
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
            <form onSubmit={handleSubmit}>
              <StockOrderTable
                isCommitedTextFieldAvailable={isCommitedTextFieldAvailable}
                isStore={false}
                activeTab={props.currentTab}
                setRows={setRows}
                rowData={rows}
                isDeliveredQtyAvailable={false}
              />
              <div className="flex pt-5 px-12">
                <div className="flex items-stretch basis-9/12 space-x-2 px-5">
                  <span className="flex self-center font-semibold">
                    Commited Delivery:
                  </span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Commited Delivery"
                      disabled={isDisabled}
                      views={["month", "day", "year"]}
                      onChange={(date) => {
                        if (date) {
                          const formattedDate = dayjs(date).format(
                            "YYYY-MM-DD 00:00:00"
                          );

                          setCommitedDeliveryDate(formattedDate);
                        }
                      }}
                      value={dayjs(CommitedDeliveryDate)}
                      renderInput={(params) => (
                        <TextField required {...params} size="small" />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className={`"basis-3/12" ${isDisabled ? "hidden" : ""}`}>
                  <Button type="submit" variant="contained">
                    Confirm
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
