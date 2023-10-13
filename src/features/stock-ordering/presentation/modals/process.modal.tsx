import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { selectGetStockOrderStores } from "../slices/get-store.slice";
import { AiOutlineDownload } from "react-icons/ai";
import {
  REACT_APP_DOMAIN_URL,
  STOCK_ORDERING_MODAL_TITLE,
} from "features/shared/constants";
import {
  StockOrderProcessActionEnabler,
  StockOrderTable,
  StockOrderingWatingSkeleton,
} from "../components";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { productDataInitialState } from "features/stock-ordering/core/productDataInitialState";
import { useEffect, useState } from "react";
import {
  GetProductDataState,
  getProductData,
  selectGetProductData,
} from "../slices/get-product-data.slice";
import { PopupModal } from "./popup.modal";
import { selectpopupScroll } from "../slices/popup-scroll.slice";

interface ProcessModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function ProcessModal(props: ProcessModalProps) {
  const dispatch = useAppDispatch();

  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getProductDataState = useAppSelector(selectGetProductData);
  const popupModalState = useAppSelector(selectpopupScroll);

  const [rows, setRows] = useState<GetProductDataModel | undefined>(
    productDataInitialState
  );

  useEffect(() => {
    if (props.id && props.open) {
      dispatch(getProductData({ orderId: props.id }));
    }
  }, [dispatch, props.open, props.id, props.currentTab]);

  useEffect(() => {
    if (
      GetProductDataState.success === getProductDataState.status &&
      getProductDataState.data
    ) {
      setRows(getProductDataState.data);
    }
  }, [getProductDataState]);

  const handleDownloadTableData = () => {
    const link = `${REACT_APP_DOMAIN_URL}api/stock/export-order-pdf/${props.id}`;
    window.open(link, "_blank");

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setRows(undefined);

    document.body.classList.remove("overflow-hidden");
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
        className={`fixed inset-0 z-30 flex items-start justify-center ${
          !popupModalState.status &&
          "overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
        } `}
      >
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">
              {STOCK_ORDERING_MODAL_TITLE[props.currentTab].label}
            </span>

            <div className="space-x-3">
              <button
                className="text-2xl text-white"
                onClick={handleDownloadTableData}
              >
                <AiOutlineDownload />
              </button>

              <button
                className="text-2xl text-white"
                onClick={handleCloseModal}
              >
                <IoMdClose />
              </button>
            </div>
          </div>

          <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
            {rows ? (
              <>
                <StockOrderTable
                  isCommitedTextFieldAvailable={props.currentTab === 0}
                  isDeliveredQtyAvailable={props.currentTab === 3}
                  enableTableEdit={props.currentTab === 0}
                  isUpdateBilling={props.currentTab === 5}
                  activeTab={props.currentTab}
                  setRows={setRows}
                  rowData={rows}
                />

                <StockOrderProcessActionEnabler
                  tab={props.currentTab}
                  orderId={props.id}
                  row={rows}
                  onClose={handleCloseModal}
                />
              </>
            ) : (
              <StockOrderingWatingSkeleton
                remarks
                firstDoubleComponents
                secondDoubleComponents
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
