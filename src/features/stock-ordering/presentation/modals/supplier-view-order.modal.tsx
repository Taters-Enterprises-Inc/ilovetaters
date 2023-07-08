import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { newOrdersParam } from "features/stock-ordering/core/stock-ordering.params";
import { updateNewOrders } from "../slices/update-new-order.slice";
import { InitializeModal, InitializeProductData } from "../components";

interface PlaceOrdersModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function SupplierViewOrderModal(props: PlaceOrdersModalProps) {
  const dispatch = useAppDispatch();

  const getProductDataState = useAppSelector(selectGetProductData);

  const [remarks, setRemarks] = useState("");

  const [CommitedDeliveryDate, setCommitedDeliveryDate] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const reviewOrdersProductDataParam: newOrdersParam["product_data"] =
      rows.product_data.map((productsItem, index) => ({
        id: productsItem.id,
        productId: productsItem.productId,
        commitedQuantity: productsItem.commitedQuantity,
      }));

    const reviewOrdersParamData: newOrdersParam = {
      id: props.id,
      commitedDelivery: CommitedDeliveryDate,
      remarks: remarks,
      product_data: reviewOrdersProductDataParam,
    };

    await dispatch(updateNewOrders(reviewOrdersParamData));

    props.onClose();
  };

  useEffect(() => {
    setCommitedDeliveryDate(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    setRemarks("");
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
            <form className="overflow-auto" onSubmit={handleSubmit}>
              <StockOrderTable
                isCommitedTextFieldAvailable={true}
                isStore={false}
                activeTab={props.currentTab}
                setRows={setRows}
                rowData={rows}
                isDeliveredQtyAvailable={false}
                isDispatchedQtyAvailable={false}
              />

              <div className="flex flex-col px-5 mt-2">
                <span>Remarks: </span>
                <TextField
                  value={remarks}
                  onChange={(event) => setRemarks(event.target.value)}
                  inputProps={{ maxLength: 128 }}
                  multiline
                />
              </div>
              <div className="flex items-stretch pt-5 space-x-5">
                <span className="basis-1/2 self-center font-semibold text-right">
                  Commited Delivery:
                </span>
                <div className="basis-1/2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Delivery date and time"
                      views={["year", "month", "day", "hours", "minutes"]}
                      onChange={(date) => {
                        if (date) {
                          const formattedDate = dayjs(date).format(
                            "YYYY-MM-DD HH:mm:ss"
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
                <div className="basis-4/5 pr-6">
                  <Button fullWidth type="submit" variant="contained">
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
