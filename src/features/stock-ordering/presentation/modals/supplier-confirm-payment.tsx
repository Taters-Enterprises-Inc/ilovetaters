import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { StockOrderingWatingSkeleton } from "../components";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  GetProductDataState,
  getProductData,
  selectGetProductData,
} from "../slices/get-product-data.slice";
import { updateStatus } from "features/stock-ordering/core/stock-ordering.params";
import {
  selectUpdateConfirmPayment,
  updateConfirmPayment,
  updateConfirmPaymentState,
} from "../slices/update-confirm-payment.slice";
import { ViewImageModal } from "./view-image.modal";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { productDataInitialState } from "features/stock-ordering/core/productDataInitialState";
import {
  REACT_APP_DOMAIN_URL,
  STOCK_ORDERING_BUTTON_STYLE,
} from "features/shared/constants";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { AiOutlineDownload } from "react-icons/ai";

interface SupplierConfirmModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function SupplierConfirmModal(props: SupplierConfirmModalProps) {
  const [openPayBillingModal, setOpenPayBillingModal] = useState(false);
  const [uploadedReceipt, setUploadedReciept] = useState<string>("");
  const [remarks, setRemarks] = useState("");
  const getProductDataState = useAppSelector(selectGetProductData);
  const dispatch = useAppDispatch();

  const [rows, setRows] = useState<GetProductDataModel | undefined>(
    productDataInitialState
  );

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 8) {
        result = true;
      }
    });

    return result;
  };

  const handleValidate = async (status: string) => {
    const updateConfirmPaymentParam: updateStatus = {
      id: props.id,
      remarks: remarks,
      status: status,
    };

    dispatch(updateConfirmPayment(updateConfirmPaymentParam));

    document.body.classList.remove("overflow-hidden");
    props.onClose();
  };

  useEffect(() => {
    setUploadedReciept(rows?.order_information.payment_detail_image ?? "");
  }, [rows?.order_information.payment_detail_image]);

  useEffect(() => {
    if (props.id && props.open) {
      dispatch(getProductData({ orderId: props.id }));
      setRemarks("");
    }
    setRows(undefined);
  }, [dispatch, props.open, props.id, props.currentTab]);

  useEffect(() => {
    if (
      GetProductDataState.success === getProductDataState.status &&
      getProductDataState.data
    ) {
      setRows(getProductDataState.data);
    }
  }, [getProductDataState]);

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
            <span className="text-2xl text-white">Confirm Payment</span>
            <div className="space-x-5">
              <button
                className="text-2xl text-white"
                onClick={() => {
                  const link = `${REACT_APP_DOMAIN_URL}api/stock/export-order-pdf/${props.id}`;
                  window.open(link, "_blank");

                  document.body.classList.remove("overflow-hidden");
                  props.onClose();
                }}
              >
                <AiOutlineDownload />
              </button>
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
          </div>

          <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
            {rows ? (
              <>
                <StockOrderTable
                  activeTab={props.currentTab}
                  setRows={setRows}
                  rowData={rows}
                />
                {setEnabled() ? (
                  <div className="space-y-2">
                    <div className="flex flex-col mt-2 ">
                      <span>Remarks: </span>
                      <TextField
                        value={remarks}
                        onChange={(event) => setRemarks(event.target.value)}
                        inputProps={{ maxLength: 512 }}
                        multiline
                      />
                    </div>
                    <div className="flex flex-col space-y-2 ">
                      {/* <div className="basis-full">
                    <Button
                      onClick={() => setOpenPayBillingModal(true)}
                      fullWidth
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#CC5801",
                      }}
                    >
                      View payment information
                    </Button>
                  </div> */}

                      <div className="flex space-x-4">
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleValidate("7")}
                          sx={STOCK_ORDERING_BUTTON_STYLE}
                        >
                          Return to Tei Finance
                        </Button>

                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleValidate("9")}
                          sx={STOCK_ORDERING_BUTTON_STYLE}
                        >
                          Validate
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                {setEnabled() ? (
                  <StockOrderingWatingSkeleton
                    remarks
                    confirmPaymentFullwidthButton
                  />
                ) : (
                  <StockOrderingWatingSkeleton />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <ViewImageModal
        isDownloadable={true}
        open={openPayBillingModal}
        onClose={() => setOpenPayBillingModal(false)}
        image={uploadedReceipt}
      />
    </>
  );
}
