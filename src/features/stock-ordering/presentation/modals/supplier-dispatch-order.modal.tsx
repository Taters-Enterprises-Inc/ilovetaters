import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import { TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UploadDeliveryRecieptModal } from "./upload-delivery-reciepts.modal";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import {
  dispatchOrderParam,
  orderID,
} from "features/stock-ordering/core/stock-ordering.params";
import {
  getProductData,
  selectGetProductData,
} from "../slices/get-product-data.slice";
import { updateDispatchOrders } from "../slices/update-dispatch-order.slice";
import { InitializeModal, InitializeProductData } from "../components";

interface SupplierDispatchOrderModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function SupplierDispatchOrderModal(
  props: SupplierDispatchOrderModalProps
) {
  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

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
    },
    product_data: [],
  });

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

  const getFileName = (): string => {
    if (typeof uploadedReceipt === "string") {
      return uploadedReceipt;
    }
    if (uploadedReceipt instanceof File) {
      return uploadedReceipt.name;
    }
    return "";
  };

  useEffect(() => {
    setUploadedReciept("");
  }, [props.open]);

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

  const handleDispatchOrder = async () => {
    const dispatchOrdersParamData: dispatchOrderParam = {
      id: props.id,
      deliveryReceipt: uploadedReceipt,
    };

    await dispatch(updateDispatchOrders(dispatchOrdersParamData));
    props.onClose();
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
            <span className="text-2xl text-white">Supplier Dispatch Order</span>
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
            <StockOrderTable
              isCommitedTextFieldAvailable={false}
              isStore={false}
              activeTab={props.currentTab}
              setRows={setRows}
              rowData={rows}
              isDeliveredQtyAvailable={false}
            />

            <div className="flex justify-end px-5 space-x-5">
              <>
                <div>
                  <Button
                    onClick={() => setOpenUploadDeliveryRecieptModal(true)}
                    variant="text"
                  >
                    {getFileName()}
                  </Button>
                </div>

                <Button
                  onClick={() => {
                    if (isValidFile(uploadedReceipt)) {
                      handleDispatchOrder();
                    } else {
                      setOpenUploadDeliveryRecieptModal(true);
                    }
                  }}
                  variant="contained"
                >
                  Dispatch Order
                </Button>
              </>
            </div>
          </div>
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
