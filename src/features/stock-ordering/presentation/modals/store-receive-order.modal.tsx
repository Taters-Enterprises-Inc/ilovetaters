import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { StockOrderTable } from "../components";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import { selectGetStockOrderStores } from "../slices/get-store.slice";
import { selectconfirmNewOrder } from "../slices/confirm-new-order.slice";
import { UploadDeliveryRecieptModal } from "./upload-delivery-reciepts.modal";
import { MdPreview } from "react-icons/md";

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

interface StoreReceiveOrderModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
}

export function StoreReceiveOrderModal(props: StoreReceiveOrderModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [buttonDisable, setButtonDisable] = useState(false);
  const [actualDeliveryDate, setActualDeliveryDate] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );
  const [isDeliveredQtyAvailable, setIsDeliveredQtyAvailable] = useState(true);
  const [openUploadDeliveryRecieptModal, setOpenUploadDeliveryRecieptModal] =
    useState(false);

  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");

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

    if (isValidFile(uploadedReceipt)) {
      // Upload file to database
      setIsDeliveredQtyAvailable(false);
      setButtonDisable(true);
    } else {
      setOpenUploadDeliveryRecieptModal(true);
    }
  };

  const isValidFile = (file: string | File | undefined): boolean => {
    if (!file) {
      return false;
    }

    if (typeof file === "string") {
      return true;
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValidExtension =
      fileExtension && allowedExtensions.includes(fileExtension);

    if (!isValidExtension) {
      return false;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      return false;
    }

    return true;
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  console.log(uploadedReceipt);

  return (
    <>
      <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Store Receive Orders</span>
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

              {buttonDisable ? null : (
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

                      {isValidFile(uploadedReceipt) ? (
                        <div className="basis-1/12 flex  justify-center items-stretch">
                          <div className="self-end">
                            <IconButton
                              onClick={() =>
                                setOpenUploadDeliveryRecieptModal(true)
                              }
                            >
                              <MdPreview className=" text-3xl" />
                            </IconButton>
                          </div>
                        </div>
                      ) : null}

                      <div className="basis-2/5 flex items-stretch space-x-5 pb-1">
                        <Button
                          className="self-end"
                          type="submit"
                          fullWidth
                          variant="contained"
                        >
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <UploadDeliveryRecieptModal
        open={openUploadDeliveryRecieptModal}
        onClose={() => setOpenUploadDeliveryRecieptModal(false)}
        setUploadedReciept={setUploadedReciept}
        isButtonAvailable={true}
      />
    </>
  );
}
