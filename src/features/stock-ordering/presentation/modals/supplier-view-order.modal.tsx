import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  getProductData,
  selectGetProductData,
} from "../slices/get-product-data.slice";
import {
  orderID,
  newOrdersParam,
} from "features/stock-ordering/core/stock-ordering.params";
import { updateNewOrders } from "../slices/update-new-order.slice";

interface PlaceOrdersModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function SupplierViewOrderModal(props: PlaceOrdersModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getProductDataState = useAppSelector(selectGetProductData);

  const [isDisabled, setDisabled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCommitedTextFieldAvailable, setIsCommitedTextFieldAvailable] =
    useState(true);
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
    },
    product_data: [],
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setIsCommitedTextFieldAvailable(false);
    setDisabled(true);

    const reviewOrdersProductDataParam: newOrdersParam["product_data"] =
      rows.product_data.map((productsItem, index) => ({
        id: productsItem.id,
        productId: productsItem.productId,
        commitedQuantity: productsItem.commitedQuantity,
      }));

    const reviewOrdersParamData: newOrdersParam = {
      id: props.id,
      commitedDelivery: CommitedDeliveryDate,
      product_data: reviewOrdersProductDataParam,
    };

    await dispatch(updateNewOrders(reviewOrdersParamData));

    props.onClose();
  };

  useEffect(() => {
    const productID: orderID = { orderId: props.id };

    if (props.open) {
      dispatch(getProductData(productID));
    }
  }, [dispatch, props.open]);

  useEffect(() => {
    if (
      getProductDataState.data &&
      getProductDataState.data.product_data &&
      getProductDataState.data.order_information
    ) {
      const order = getProductDataState.data?.order_information;
      const order_information: TableRow["order_information"] = {
        store_name: order.store_name,
        order_number: order.id,
        requested_delivery_date: order.requested_delivery_date,
        commited_delivery_date: order.commited_delivery_date,
        order_reviewed_date: order.reviewed_date,
        order_confirmation_date: order.order_confirmation_date,
        view_delivery_receipt: order.delivery_receipt,
        dispatch_date: order.dispatch_date,
        order_enroute: order.enroute_date,
        actual_delivery_date: order.actual_delivery_date,
        view_updated_delivery_receipt: order.updated_delivery_receipt,
        billing_information_ready:
          order.billing_id && order.billing_amount ? true : false,
        view_payment_details: order.payment_detail_image,
        payment_confirmation: order.order_confirmation_date,
      };

      const productData: TableRow["product_data"] =
        getProductDataState.data.product_data.map((product) => ({
          id: product.id,
          productId: product.product_id,
          productName: product.product_name,
          uom: product.uom,
          orderQty: product.order_qty,
          commitedQuantity: product.commited_qty,
          deliveredQuantity: product.delivered_qty,
        }));

      setRows({
        order_information: order_information,
        product_data: productData,
      });
    }
  }, [getProductDataState.data]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  console.log(getProductDataState.data?.order_information?.store_name);

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
                isCommitedTextFieldAvailable={isCommitedTextFieldAvailable}
                isStore={false}
                activeTab={props.currentTab}
                setRows={setRows}
                rowData={rows}
                isDeliveredQtyAvailable={false}
              />
              <div className="flex items-stretch pt-5 px-12 space-x-5">
                <span className="basis-1/2 self-center font-semibold text-right">
                  Commited Delivery:
                </span>
                <div className="basis-1/2">
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
                <div className="basis-4/5">
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
