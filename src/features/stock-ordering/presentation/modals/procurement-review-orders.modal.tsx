import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import { TextField, Button, Switch, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { StockOrderingInformationModel } from "features/stock-ordering/core/domain/table-row.model";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { updatReviewParam } from "features/stock-ordering/core/stock-ordering.params";
import {
  selectupdateReviewOrders,
  updateReviewOrders,
  updateReviewOrdersState,
} from "../slices/update-review-order.slice";
import {
  InitializeModal,
  InitializeProductData,
  StockOrderingWatingSkeleton,
} from "../components";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { productDataInitialState } from "features/stock-ordering/core/productDataInitialState";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";

interface ProcurementReviewOrdersModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function ProcurementReviewOrdersModal(
  props: ProcurementReviewOrdersModalProps
) {
  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const [status, setStatus] = useState("");

  const [remarks, setRemarks] = useState("");

  const [rows, setRows] = useState<StockOrderingInformationModel>(
    productDataInitialState
  );

  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const stockUpdateReviewOrderState = useAppSelector(selectupdateReviewOrders);

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 2 || isEditEnabled) {
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
    setIsEditEnabled(false);
    setRemarks("");
  }, [props.open]);

  const handleOrderReviewed = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const reviewOrdersProductDataParam: updatReviewParam["product_data"] =
      rows.product_data.map((product) => ({
        id: product.id,
        productId: product.productId,
        commitedQuantity: product.commitedQuantity,
      }));

    const reviewOrdersParamData: updatReviewParam = {
      id: props.id,
      remarks: remarks,
      product_data: reviewOrdersProductDataParam,
      status: status,
    };

    dispatch(updateReviewOrders(reviewOrdersParamData));

    document.body.classList.remove("overflow-hidden");
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
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm "
      >
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">
              Procurement Review Orders
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
          <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary">
            {rows.product_data.length !== 0 ? (
              <form className="space-y-3" onSubmit={handleOrderReviewed}>
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

                {setEnabled() || isEditEnabled ? (
                  <div className="px-2 space-y-3">
                    <div className="flex flex-col">
                      <span>Remarks: </span>
                      <TextField
                        value={remarks}
                        onChange={(event) => setRemarks(event.target.value)}
                        inputProps={{ maxLength: 512 }}
                        multiline
                      />
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        fullWidth
                        variant="contained"
                        disabled={isQuantityEmpty()}
                        type="submit"
                        onClick={() => setStatus("1")}
                        sx={STOCK_ORDERING_BUTTON_STYLE}
                      >
                        Send back to New Order
                      </Button>

                      <Button
                        fullWidth
                        variant="contained"
                        disabled={isQuantityEmpty()}
                        type="submit"
                        onClick={() => setStatus("3")}
                        sx={STOCK_ORDERING_BUTTON_STYLE}
                      >
                        Order Reviewed
                      </Button>
                    </div>
                  </div>
                ) : null}
              </form>
            ) : (
              <>
                {setEnabled() ? (
                  <StockOrderingWatingSkeleton remarks firstDoubleComponents />
                ) : (
                  <StockOrderingWatingSkeleton />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
