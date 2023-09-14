import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { useState } from "react";
import { StockOrderingInformationModel } from "features/stock-ordering/core/domain/table-row.model";
import {
  InitializeModal,
  InitializeProductData,
  StockOrderingWatingSkeleton,
} from "../components";
import { useAppSelector } from "features/config/hooks";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { productDataInitialState } from "features/stock-ordering/core/productDataInitialState";

interface CompleteModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function CompleteModal(props: CompleteModalProps) {
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
            <span className="text-2xl text-white">Complete Modal</span>
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
            {rows.product_data.length !== 0 ? (
              <StockOrderTable
                isCommitedTextFieldAvailable={false}
                isStore={false}
                activeTab={props.currentTab}
                setRows={setRows}
                rowData={rows}
                isDeliveredQtyAvailable={false}
                isDispatchedQtyAvailable={false}
                isUpdateBilling={false}
              />
            ) : (
              <StockOrderingWatingSkeleton />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
