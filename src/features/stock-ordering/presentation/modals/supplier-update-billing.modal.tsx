import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { Button, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AddBillingInformationModal } from "./add-billing-information.modal";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import { InitializeModal, InitializeProductData } from "../components";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { updateBillingOrders } from "../slices/update-billing-order.slice";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { UploadDeliveryRecieptModal } from "./upload-delivery-reciepts.modal";
import { MdPreview } from "react-icons/md";
import { createQueryParams } from "features/config/helpers";
import { updateBillingOrderParam } from "features/stock-ordering/core/stock-ordering.params";

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

  const [warning, setWarning] = useState(false);
  const [openUploadDeliveryRecieptModal, setOpenUploadDeliveryRecieptModal] =
    useState(false);

  const [uploadedReceipt, setUploadedReciept] = useState<string | File>();

  const [billingInformation, setBillingInformation] = useState<{
    billing_id: string;
    billing_amount: string;
  }>({
    billing_id: "",
    billing_amount: "",
  });
  const [remarks, setRemarks] = useState("");

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
      remarks: [],
    },
    product_data: [],
  });

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

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
    setBillingInformation({
      billing_id: "",
      billing_amount: "",
    });
    setRemarks("");
    setWarning(false);
  }, [props.open]);

  useEffect(() => {
    if (rows.product_data && uploadedReceipt === undefined) {
      const isWarning = rows.product_data.some(
        (product) => product.dispatchedQuantity !== product.deliveredQuantity
      );

      if (isWarning) setWarning(true);
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
    const query: updateBillingOrderParam = {
      id: props.id,
      remarks: remarks,
      uploadedReceipt: uploadedReceipt ?? "",
      withNewSI: uploadedReceipt ? true : false,
    };

    await dispatch(updateBillingOrders(query));

    props.onClose();
  };

  const isValidFile = (file: string | File | undefined): boolean => {
    if (!file) {
      return false;
    }

    if (typeof file === "string") {
      return true;
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
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
                    warning || uploadedReceipt ? "" : "hidden"
                  } space-x-2 border border-gray-200 rounded-lg shadow-md px-5 py-2 border-l-8 border-l-tertiary`}
                >
                  <span className="font-semibold">Warning:</span>
                  <span className="text-sm">
                    Dispatch quantity and delivered quantity does not match.
                    Must upload updated sales invoice
                  </span>
                </div>
                <div className="flex flex-row space-x-4">
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
                      Download Sales Invoice
                    </Button>
                  </div>

                  <div className="basis-1/2">
                    {!warning ? (
                      <Button
                        onClick={() => handleSupplierUpdate()}
                        fullWidth
                        variant="contained"
                        sx={{ color: "white", backgroundColor: "#CC5801" }}
                      >
                        Confirm
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setOpenUploadDeliveryRecieptModal(true);
                          setWarning(false);
                        }}
                        fullWidth
                        variant="contained"
                        sx={{ color: "white", backgroundColor: "#CC5801" }}
                      >
                        Upload updated sales invoice
                      </Button>
                    )}
                  </div>
                  {uploadedReceipt && isValidFile(uploadedReceipt) ? (
                    <div className="basis-1/12 flex  justify-center items-stretch">
                      <div className="self-end">
                        <IconButton
                          onClick={() =>
                            setOpenUploadDeliveryRecieptModal(true)
                          }
                        >
                          <MdPreview className="text-3xl" />
                        </IconButton>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <UploadDeliveryRecieptModal
        open={openUploadDeliveryRecieptModal}
        onClose={() => setOpenUploadDeliveryRecieptModal(false)}
        setUploadedReciept={setUploadedReciept}
        isButtonAvailable={true}
      />
    </>
  );
}
