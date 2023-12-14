import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { PopupModal } from "../modals";
import { StockOrderRemarks } from "./stock-order-remarks";
import { useState } from "react";

interface StockOrderProcessFranchiseePayBillProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessFranchiseePayBill(
  props: StockOrderProcessFranchiseePayBillProps
) {
  const [remarks, setRemarks] = useState("");
  const [openPopup, setOpenPopUp] = useState(false);

  const handleOnSubmit = () => {};
  const handleDispatchOrder = () => {};

  return (
    <>
      <form className="space-y-3" onSubmit={handleOnSubmit}>
        <div className="flex flex-col px-3 space-y-3">
          <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />
        </div>
      </form>

      <PopupModal
        open={openPopup}
        title={"Submit Confirmation"}
        message={
          <span>
            Are you sure you want to{" "}
            <span className="font-semibold underline underline-offset-1">
              Dispatch the Order?
            </span>
          </span>
        }
        handleYesButton={handleDispatchOrder}
        handleNoButton={() => {
          setOpenPopUp(false);
        }}
      />
    </>
  );
}
