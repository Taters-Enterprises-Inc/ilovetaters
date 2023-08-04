import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { useEffect, useState } from "react";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { InitializeModal, InitializeProductData } from "../components";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { PayMultipleOrder } from "../components/pay-multiple-order";

interface StorePayBillingModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function StorePayBillingModal(props: StorePayBillingModalProps) {
  const [openPayBillingModal, setOpenPayBillingModal] = useState(false);
  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");
  const [remarks, setRemarks] = useState("");

  const getProductDataState = useAppSelector(selectGetProductData);

  const dispatch = useAppDispatch();

  const [rows, setRows] = useState<TableRow>({
    order_information: {
      store_name: "",
      ship_to_address: "",
      store_id: "",

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
      transport_route: "",
      region_id: 0,
      remarks: [],
    },
    product_data: [],
  });

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 7) {
        result = true;
      }
    });

    return result;
  };

  useEffect(() => {
    setUploadedReciept("");
    setRemarks("");
  }, [props.open]);

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
                />
              </>
            ) : (
              <PayMultipleOrder
                onClose={(close: boolean) => close && props.onClose()}
              />
            )}
          </div>

          {/* <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
            <StockOrderTable
              isCommitedTextFieldAvailable={false}
              isStore={false}
              activeTab={props.currentTab}
              setRows={setRows}
              rowData={rows}
              isDeliveredQtyAvailable={false}
              isDispatchedQtyAvailable={false}
            />

            {setEnabled() ? (
              <div className="px-5 space-y-2">
                <div className="flex flex-col mt-2 ">
                  <span>Remarks: </span>
                  <TextField
                    value={remarks}
                    onChange={(event) => setRemarks(event.target.value)}
                    inputProps={{ maxLength: 512 }}
                    multiline
                  />
                </div>

                <div className="flex flex-row space-x-4">
                  <div className="basis-1/2">
                    <Button
                      onClick={() => setOpenPayBillingModal(true)}
                      fullWidth
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#CC5801",
                      }}
                    >
                      Pay Billing
                    </Button>
                  </div>
                  <div className="basis-1/2">
                    <Button
                      disabled={
                        isValidFile(uploadedReceipt) && uploadedReceipt !== ""
                          ? false
                          : true
                      }
                      onClick={() => handlePayBilling()}
                      fullWidth
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#CC5801",
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div> */}
        </div>
      </div>
    </>
  );
}
