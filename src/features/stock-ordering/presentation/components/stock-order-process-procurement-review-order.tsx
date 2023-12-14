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

interface StockOrderProcessProcurementReviewOrderProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessProcurementReviewOrder(
  props: StockOrderProcessProcurementReviewOrderProps
) {
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [reject, setReject] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmitOrder = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (status === "1") {
      setReject(true);
    } else if (status === "3") {
      setReject(false);
    }

    setOpenPopup(true);
  };

  const handleOrderReviewed = () => {
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
  };

  return (
    <>
      <form onSubmit={handleSubmitOrder}>
        <div className="px-2 space-y-3">
          <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />

          <div className="flex space-x-3">
            <Button
              fullWidth
              variant="contained"
              type="submit"
              onClick={() => setStatus("1")}
              sx={STOCK_ORDERING_BUTTON_STYLE}
            >
              Send back to New Order
            </Button>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              onClick={() => setStatus("4")}
              sx={STOCK_ORDERING_BUTTON_STYLE}
            >
              Order Reviewed
            </Button>
          </div>
        </div>
      </form>

      <PopupModal
        open={openPopup}
        title={"Confirmation!"}
        message={
          reject ? (
            <span>
              Are you sure you want to{" "}
              <span className="font-semibold underline underline-offset-1 ">
                Send back the order to the supplier
              </span>
              ?
            </span>
          ) : (
            <span>
              Are you sure you want to{" "}
              <span className="font-semibold underline underline-offset-1">
                move the order for the process?
              </span>
              ?
            </span>
          )
        }
        icon={<BsCheckCircleFill className="text-3xl text-[#00FA9A]" />}
        handleYesButton={handleOrderReviewed}
        handleNoButton={() => {
          setStatus("");
          setOpenPopup(false);
        }}
      />
    </>
  );
}
