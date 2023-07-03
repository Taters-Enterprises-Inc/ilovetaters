import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import {
  orderID,
  updateStatus,
} from "features/stock-ordering/core/stock-ordering.params";
import {
  getProductData,
  selectGetProductData,
} from "../slices/get-product-data.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { updateReviewOrders } from "../slices/update-review-order.slice";
import { updateConfirmOrders } from "../slices/update-confirm-order.slice";

interface ProcurementConfirmOrdersModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function ProcurementConfirmOrdersModal(
  props: ProcurementConfirmOrdersModalProps
) {
  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

  const [isCommitedTextFieldAvailable, setIsCommitedTextFieldAvailable] =
    useState(false);

  const [isHidden, setHidden] = useState(false);
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

  const handleOrderConfirmed = async () => {
    const confirmOrdersParamData: updateStatus = {
      id: props.id,
    };

    await dispatch(updateConfirmOrders(confirmOrdersParamData));

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
            <span className="text-2xl text-white">
              Procurement Confirm Orders
            </span>
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
              isCommitedTextFieldAvailable={isCommitedTextFieldAvailable}
              isStore={false}
              activeTab={props.currentTab}
              setRows={setRows}
              rowData={rows}
              isDeliveredQtyAvailable={false}
            />
            <div className="flex justify-end px-5">
              <Button
                onClick={() => handleOrderConfirmed()}
                variant="contained"
              >
                Order Confirmed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
