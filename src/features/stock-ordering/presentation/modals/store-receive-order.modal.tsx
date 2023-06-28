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
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";

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

  const [rows, setRows] = useState<TableRow>({
    order_information: {
      store_name: "Taters Acacia Estate",
      order_number: "1",
      requested_delivery_date: "June 28, 2023",
      commited_delivery_date: "July 28, 2023",
      order_reviewed_date: "June 28, 2023",
      order_confirmation_date: "June 28, 2023",
      view_delivery_receipt: "image.jpg",
      dispatch_date: "July 10, 2023",
      order_enroute: "July 10, 2023",
      actual_delivery_date: "July 20, 2023",
      view_updated_delivery_receipt: "image.jpg",
      billing_information_ready: "",
      view_payment_details: "image.jpg",
      payment_confirmation: "July 20, 2023",
    },
    product_data: [
      {
        id: "1",
        productId: "1",
        productName: "Product 1",
        uom: "PACK",
        cost: "100",
        orderQty: "50",
        currentStock: "10000",
        commitedQuantity: "100",
        deliveredQuantity: "50",
      },
      {
        id: "2",
        productId: "2",
        productName: "Product 2",
        uom: "BAGS",
        cost: "50",
        orderQty: "25",
        currentStock: "500",
        commitedQuantity: "20",
        deliveredQuantity: "5",
      },
      {
        id: "3",
        productId: "3",
        productName: "Product 3",
        uom: "BAGS",
        cost: "50",
        orderQty: "25",
        currentStock: "500",
        commitedQuantity: "20",
        deliveredQuantity: "5",
      },
    ],
  });

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
