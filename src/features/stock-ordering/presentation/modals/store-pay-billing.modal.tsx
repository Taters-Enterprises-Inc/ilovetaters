import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { useEffect, useState } from "react";
import { StockOrderingInformationModel } from "features/stock-ordering/core/domain/table-row.model";
import {
  InitializeModal,
  InitializeProductData,
  StockOrderingWatingSkeleton,
} from "../components";
import { useAppSelector } from "features/config/hooks";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { PayMultipleOrder } from "../components/pay-multiple-order";
import { productDataInitialState } from "features/stock-ordering/core/productDataInitialState";

interface StorePayBillingModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function StorePayBillingModal(props: StorePayBillingModalProps) {
  const getProductDataState = useAppSelector(selectGetProductData);

  const [rows, setRows] = useState<StockOrderingInformationModel>(
    productDataInitialState
  );

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
            <span className="text-2xl text-white">Pay Order Billing</span>
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
            {props.id ? (
              <>
                {rows.product_data.length !== 0 ? (
                  <>
                    <div className="border border-gary-200 shadow-md rounded-md px-5 py-3 border-l-8 border-l-tertiary">
                      <div>Chillin' and Billin' - Awaiting Payment!...</div>
                    </div>
                    <StockOrderTable
                      isCommitedTextFieldAvailable={false}
                      isStore={false}
                      activeTab={props.currentTab}
                      setRows={setRows}
                      rowData={rows}
                      isDeliveredQtyAvailable={false}
                      isDispatchedQtyAvailable={false}
                      isUpdateBilling={false}
                    />{" "}
                  </>
                ) : (
                  <StockOrderingWatingSkeleton />
                )}
              </>
            ) : (
              <PayMultipleOrder
                onClose={(close: boolean) => close && props.onClose()}
                open={props.open}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
