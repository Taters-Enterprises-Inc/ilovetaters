import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { StockOrderRemarks } from "./stock-order-remarks";
import { useState } from "react";
import { Button } from "@mui/material";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { updatReviewParam } from "features/stock-ordering/core/stock-ordering.params";
import { updateReviewOrders } from "../slices/update-review-order.slice";
import { useAppDispatch } from "features/config/hooks";
import { PopupModal } from "../modals";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  closeMessageModal,
  openMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";

interface StockOrderProcessProcurementReviewOrderProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessProcurementReviewOrder(
  props: StockOrderProcessProcurementReviewOrderProps
) {
  const [remarks, setRemarks] = useState("");

  const dispatch = useAppDispatch();

  const handleOrderReviewed = (status: string) => () => {
    dispatch(
      openMessageModal({
        message: `Confirming this action will ${
          status === "1"
            ? "return the order to the supplier"
            : "move the order for the next process"
        }. Are you sure you want to proceed?`,
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
              const reviewOrdersProductDataParam: updatReviewParam["product_data"] =
                props.rows?.product_data.map((product) => ({
                  id: product.id,
                  productId: product.product_id,
                  commitedQuantity: product.commited_qty,
                })) ?? [];

              const reviewOrdersParamData: updatReviewParam = {
                id: props.orderId,
                remarks: remarks,
                product_data: reviewOrdersProductDataParam,
                status: status,
              };

              dispatch(updateReviewOrders(reviewOrdersParamData));

              document.body.classList.remove("overflow-hidden");
              props.onClose(true);
              dispatch(closeMessageModal());
            },
          },
          {
            color: "#22201A",
            text: "No",
            onClick: () => {
              dispatch(closeMessageModal());
            },
          },
        ],
      })
    );
  };

  return (
    <>
      <div className="px-2 space-y-3">
        <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />

        <div className="flex space-x-3">
          <Button
            fullWidth
            variant="contained"
            type="submit"
            onClick={handleOrderReviewed("1")}
            sx={STOCK_ORDERING_BUTTON_STYLE}
          >
            Send back to New Order
          </Button>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            onClick={handleOrderReviewed("4")}
            sx={STOCK_ORDERING_BUTTON_STYLE}
          >
            Order Reviewed
          </Button>
        </div>
      </div>
    </>
  );
}
