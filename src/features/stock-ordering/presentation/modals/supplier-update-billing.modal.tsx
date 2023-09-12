import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { Button, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { StockOrderingInformationModel } from "features/stock-ordering/core/domain/table-row.model";
import { InitializeModal, InitializeProductData } from "../components";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetProductData } from "../slices/get-product-data.slice";
import {
  selectUpdateBillingOrders,
  updateBillingOrders,
  updateBillingOrdersState,
} from "../slices/update-billing-order.slice";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import {
  REACT_APP_DOMAIN_URL,
  STOCK_ORDERING_BUTTON_STYLE,
} from "features/shared/constants";
import { UploadDeliveryRecieptModal } from "./upload-delivery-reciepts.modal";
import { MdPreview } from "react-icons/md";
import { updateBillingOrderParam } from "features/stock-ordering/core/stock-ordering.params";
import { isValid } from "date-fns";
import { productDataInitialState } from "features/stock-ordering/core/productDataInitialState";

interface SupplierUpdateBillingModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function SupplierUpdateBillingModal(
  props: SupplierUpdateBillingModalProps
) {
  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

  const [warningMismatch, setWarningMismatch] = useState(false);
  const [warningNonNCR, setwarningNonNCR] = useState(false);

  const [openUploadDeliveryRecieptModal, setOpenUploadDeliveryRecieptModal] =
    useState(false);
  const [openuploadedGoodsReceipt, setUploadedGoodsReceiptModal] =
    useState(false);

  const [uploadedGoodsReceipt, setUploadedGoodsReciept] = useState<
    string | File
  >();
  const [uploadedRegionReceipt, setUploadedRegionReciept] = useState<
    string | File
  >();

  const [remarks, setRemarks] = useState("");

  const [rows, setRows] = useState<StockOrderingInformationModel>(
    productDataInitialState
  );

  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const updateBillingState = useAppSelector(selectUpdateBillingOrders);

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 6) {
        result = true;
      }
    });

    return result;
  };

  useEffect(() => {
    setRemarks("");
    setUploadedGoodsReciept("");
    setUploadedRegionReciept("");
  }, [props.open]);

  useEffect(() => {
    if (
      rows.product_data &&
      (uploadedGoodsReceipt === "" || uploadedRegionReceipt === "")
    ) {
      const isWarningMismatch = rows.product_data.some(
        (product) => product.commitedQuantity !== product.deliveredQuantity
      );

      const isWarningNonNCR = rows.order_information.region_id !== 2;

      setWarningMismatch(isWarningMismatch);
      setwarningNonNCR(isWarningNonNCR);
    }
  }, [rows]);

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

  const handleSupplierUpdate = async () => {
    const updateBillingOrderParam: updateBillingOrderParam = {
      id: props.id,
      remarks: remarks,
      uploadedGoodsReceipt: uploadedGoodsReceipt ?? "",
      uploadedRegionReceipt: uploadedRegionReceipt ?? "",
      withNewSI: uploadedGoodsReceipt || uploadedRegionReceipt ? true : false,
    };

    dispatch(updateBillingOrders(updateBillingOrderParam));

    document.body.classList.remove("overflow-hidden");
    props.onClose();
  };

  const isValidFile = (file: string | File | undefined): boolean => {
    if (!file) {
      return false;
    }

    if (typeof file === "string") {
      return true;
    }

    const allowedExtensions = ["xls", "xlsx"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValidExtension =
      fileExtension && allowedExtensions.includes(fileExtension);

    if (!isValidExtension) {
      return false;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      return false;
    }

    return true;
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
            <span className="text-2xl text-white">Update Order Billing</span>
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
              isCommitedTextFieldAvailable={false}
              isStore={false}
              activeTab={props.currentTab}
              setRows={setRows}
              rowData={rows}
              isDeliveredQtyAvailable={false}
              isDispatchedQtyAvailable={false}
              isUpdateBilling={true}
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

                <div
                  className={`${
                    warningMismatch ? "" : "hidden"
                  } space-x-2 border border-gray-200 rounded-lg shadow-md px-5 py-2 border-l-8 border-l-tertiary`}
                >
                  <span className="font-semibold">Warning:</span>
                  <span className="text-sm">
                    Dispatch quantity and delivered quantity does not match.
                    Must upload updated sales invoice
                  </span>
                </div>

                <div
                  className={`${
                    warningNonNCR ? "" : "hidden"
                  } space-x-2 border border-gray-200 rounded-lg shadow-md px-5 py-2 border-l-8 border-l-tertiary`}
                >
                  <span className="font-semibold">Warning:</span>
                  <span className="text-sm">
                    Store location is not in NCR region. Must upload updated
                    sales invoice
                  </span>
                </div>

                <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                  <div className="basis-1/2">
                    <Button
                      onClick={() => {
                        const id = props.id;
                        const link = `${REACT_APP_DOMAIN_URL}api/stock/generate-si-pdf/${id}`;

                        window.open(link, "_blank");
                      }}
                      fullWidth
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "#CC5801" }}
                    >
                      Download SI
                    </Button>
                  </div>

                  <div className="basis-1/2">
                    {(warningMismatch &&
                      !warningNonNCR &&
                      isValidFile(uploadedGoodsReceipt)) ||
                    (!warningMismatch &&
                      warningNonNCR &&
                      isValidFile(uploadedRegionReceipt)) ||
                    (warningMismatch &&
                      warningNonNCR &&
                      isValidFile(uploadedGoodsReceipt) &&
                      isValidFile(uploadedRegionReceipt)) ||
                    (!warningMismatch && !warningNonNCR) ? (
                      <div className="space-y-1">
                        <Button
                          onClick={() => handleSupplierUpdate()}
                          fullWidth
                          variant="contained"
                          sx={STOCK_ORDERING_BUTTON_STYLE}
                        >
                          Confirm
                        </Button>

                        <div className="flex flex-col space-y-1 md:flex-row md:space-x-3 md:space-y-0">
                          {warningMismatch && (
                            <Button
                              onClick={() => setUploadedGoodsReceiptModal(true)}
                              size="small"
                              variant="outlined"
                              sx={{ flexBasis: "50%" }}
                            >
                              Change SI (Goods)
                            </Button>
                          )}

                          {warningNonNCR && (
                            <Button
                              onClick={() =>
                                setOpenUploadDeliveryRecieptModal(true)
                              }
                              size="small"
                              variant="outlined"
                              sx={{ flexBasis: "50%" }}
                            >
                              change SI (Region)
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {warningMismatch &&
                          !isValidFile(uploadedGoodsReceipt) && (
                            <Button
                              id="goods"
                              onClick={() => setUploadedGoodsReceiptModal(true)}
                              fullWidth
                              variant="contained"
                              sx={STOCK_ORDERING_BUTTON_STYLE}
                            >
                              Upload updated sales invoice (GOODS)
                            </Button>
                          )}

                        {warningNonNCR &&
                          !isValidFile(uploadedRegionReceipt) && (
                            <Button
                              id="region"
                              onClick={() =>
                                setOpenUploadDeliveryRecieptModal(true)
                              }
                              fullWidth
                              variant="contained"
                              sx={STOCK_ORDERING_BUTTON_STYLE}
                            >
                              Upload updated sales invoice (REGION)
                            </Button>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <UploadDeliveryRecieptModal
        open={openuploadedGoodsReceipt}
        onClose={() => setUploadedGoodsReceiptModal(false)}
        setUploadedReciept={setUploadedGoodsReciept}
        isButtonAvailable={true}
      />

      <UploadDeliveryRecieptModal
        open={openUploadDeliveryRecieptModal}
        onClose={() => setOpenUploadDeliveryRecieptModal(false)}
        setUploadedReciept={setUploadedRegionReciept}
        isButtonAvailable={true}
      />
    </>
  );
}
