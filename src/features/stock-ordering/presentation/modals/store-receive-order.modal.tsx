import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  InitializeModal,
  InitializeProductData,
  StockOrderTable,
} from "../components";
import { UploadDeliveryRecieptModal } from "./upload-delivery-reciepts.modal";
import { MdPreview } from "react-icons/md";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { receiveOrdersParam } from "features/stock-ordering/core/stock-ordering.params";
import { updateReceiveOrders } from "../slices/update-receive-order.slice";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";

interface StoreReceiveOrderModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function StoreReceiveOrderModal(props: StoreReceiveOrderModalProps) {
  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

  const [actualDeliveryDate, setActualDeliveryDate] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );
  const [openUploadDeliveryRecieptModal, setOpenUploadDeliveryRecieptModal] =
    useState(false);

  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");

  const [rows, setRows] = useState<TableRow>({
    order_information: {
      store_name: "",
      order_number: "",
      requested_delivery_date: "",
      commited_delivery_date: "",
      order_reviewed_date: "",
      order_confirmation_date: "",
      view_delivery_receipt: "",
      dispatch_date: "",
      order_enroute: "",
      actual_delivery_date: "",
      view_updated_delivery_receipt: "",
      billing_information_ready: false,
      view_payment_details: "",
      payment_confirmation: "",
      transport_route: "",
      remarks: [],
    },
    product_data: [],
  });

  useEffect(() => {
    setActualDeliveryDate(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    setUploadedReciept("");
  }, [props.open]);

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 1 || user_group.id === 2 || user_group.id === 6) {
        result = true;
      }
    });

    return result;
  };

  InitializeModal({
    setRows: setRows,
    id: props.id,
    open: props.open,
  });

  InitializeProductData({
    setRows: setRows,
    productData: getProductDataState.data
      ? getProductDataState.data
      : undefined,
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isValidFile(uploadedReceipt)) {
      const receieveOrdersProductDataParam: receiveOrdersParam["product_data"] =
        rows.product_data.map((product) => ({
          id: product.id,
          productId: product.productId,
          deliveryQuantity: product.deliveredQuantity,
        }));

      const receiveOrdersParamData: receiveOrdersParam = {
        id: props.id,
        actualDeliveryDate: actualDeliveryDate,
        updatedDeliveryReceipt: uploadedReceipt,
        product_data: receieveOrdersProductDataParam,
      };

      await dispatch(updateReceiveOrders(receiveOrdersParamData));

      props.onClose();
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
                isDeliveredQtyAvailable={setEnabled()}
                isDispatchedQtyAvailable={false}
              />

              {setEnabled() ? (
                <div className="space-y-5">
                  <div className="px-5">
                    <div className="flex flex-row space-x-5">
                      <div className="basis-1/2 flex flex-col space-y-2">
                        <span>Actual Delivery Date: </span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            label="Delivery date and time"
                            views={["year", "month", "day", "hours", "minutes"]}
                            onChange={(date) => {
                              if (date) {
                                const formattedDate = dayjs(date).format(
                                  "YYYY-MM-DD HH:mm:ss"
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
              ) : null}
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