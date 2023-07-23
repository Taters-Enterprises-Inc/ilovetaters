import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UploadDeliveryRecieptModal } from "./upload-delivery-reciepts.modal";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { dispatchOrderParam } from "features/stock-ordering/core/stock-ordering.params";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { updateDispatchOrders } from "../slices/update-dispatch-order.slice";
import { InitializeModal, InitializeProductData } from "../components";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";

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

  const [transport, setTransport] = useState("");
  const [dispatchedDelivery, setDispachedDelivery] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");
  const [remarks, setRemarks] = useState("");

  const [rows, setRows] = useState<TableRow>({
    order_information: {
      store_name: "",
      order_number: "",
      ship_to_address: "",

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

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 4 || user_group.id === 6 || user_group.id === 8) {
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

  useEffect(() => {
    setUploadedReciept("");
    setDispachedDelivery(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    setTransport("");
    setRemarks("");
  }, [props.open]);

  const handleDispatchOrder = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const dispatchedOrdersProductDataParam: dispatchOrderParam["product_data"] =
      rows.product_data.map((product) => ({
        id: product.id,
        productId: product.productId,
        dispatchedQuantity: product.dispatchedQuantity,
      }));

    const dispatchOrdersParamData: dispatchOrderParam = {
      id: props.id,
      deliveryReceipt: uploadedReceipt,
      dispatchDeliveryDate: dispatchedDelivery,
      transport: transport,
      remarks: remarks,
      user_id: getAdminSessionState.data?.admin.user_id ?? "",
      product_data: dispatchedOrdersProductDataParam,
    };

    await dispatch(updateDispatchOrders(dispatchOrdersParamData));
    props.onClose();
  };

  const isQuantityEmpty = () => {
    let empty = false;
    rows.product_data.map((product) => {
      if (product.commitedQuantity === "") empty = true;
    });

    return empty;
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

          <form onSubmit={handleDispatchOrder}>
            <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
              <StockOrderTable
                isCommitedTextFieldAvailable={false}
                isStore={false}
                activeTab={props.currentTab}
                setRows={setRows}
                rowData={rows}
                isDeliveredQtyAvailable={false}
                isDispatchedQtyAvailable={setEnabled()}
              />
              {setEnabled() ? (
                <div className="flex flex-col px-5">
                  <div className="flex flex-row space-x-3">
                    <FormControl required={true}>
                      <div className="flex flex-col items-stretch space-x-2">
                        <span className="self-start pb-1 text-lg">
                          Transport Route:
                        </span>

                        <RadioGroup
                          onChange={(event, value) => setTransport(value)}
                          value={transport}
                          row
                          aria-labelledby="transport-group"
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Ground Transport"
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="Ocean Transport"
                          />
                          <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label="Air Freight"
                          />
                        </RadioGroup>
                      </div>
                    </FormControl>

                    <div className="flex flex-col space-y-2">
                      <span>Dispatched Delivery Date: </span>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Delivery date and time"
                          views={["year", "month", "day", "hours", "minutes"]}
                          onChange={(date) => {
                            if (date) {
                              const formattedDate = dayjs(date).format(
                                "YYYY-MM-DD HH:mm:ss"
                              );

                              setDispachedDelivery(formattedDate);
                            }
                          }}
                          value={dayjs(dispatchedDelivery)}
                          renderInput={(params) => (
                            <TextField required {...params} size="small" />
                          )}
                          minDateTime={dayjs()}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-col mt-2">
                      <span>Remarks: </span>
                      <TextField
                        value={remarks}
                        onChange={(event) => setRemarks(event.target.value)}
                        inputProps={{ maxLength: 512 }}
                        multiline
                      />
                    </div>

                    <div className="flex flex-row space-x-2">
                      <>
                        <Button
                          fullWidth
                          size="small"
                          onClick={() => {
                            setOpenUploadDeliveryRecieptModal(true);
                          }}
                          variant="contained"
                        >
                          Upload Sales Invoice
                        </Button>

                        <Button
                          fullWidth
                          disabled={
                            !isValidFile(uploadedReceipt) ||
                            transport === "" ||
                            isQuantityEmpty()
                          }
                          type="submit"
                          size="small"
                          variant="contained"
                        >
                          Dispatch Order
                        </Button>
                      </>
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
