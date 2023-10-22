import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { updateBillingOrderParam } from "features/stock-ordering/core/stock-ordering.params";
import { useEffect, useState } from "react";
import { StockOrderRemarks } from ".";
import { Button } from "@mui/material";
import {
  REACT_APP_DOMAIN_URL,
  STOCK_ORDERING_BUTTON_STYLE,
} from "features/shared/constants";
import { updateBillingOrders } from "../slices/update-billing-order.slice";
import { useAppDispatch } from "features/config/hooks";
import { PopupModal, UploadDeliveryRecieptModal } from "../modals";
import { isValidFile } from "./stock-ordering-utils";

interface StockOrderProcessSupplierUpdateBillingProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessSupplierUpdateBilling(
  props: StockOrderProcessSupplierUpdateBillingProps
) {
  const dispatch = useAppDispatch();

  const [remarks, setRemarks] = useState("");
  const [uploadedGoodsReceipt, setUploadedGoodsReceipt] = useState<
    string | File
  >("");
  const [uploadedRegionReceipt, setUploadedRegionReceipt] = useState<
    string | File
  >("");

  const [openPopupModal, setOpenPopupModal] = useState(false);
  const [warningMismatch, setWarningMismatch] = useState(false);
  const [warningNonNCR, setwarningNonNCR] = useState(false);
  const [openUploadRegionReceiptModal, setOpenUploadRegionReceiptModal] =
    useState(false);
  const [openUploadedGoodsReceipt, setUploadedGoodsReceiptModal] =
    useState(false);

  useEffect(() => {
    if (
      props.rows.product_data &&
      (uploadedGoodsReceipt === "" || uploadedRegionReceipt === "")
    ) {
      const isWarningMismatch = props.rows.product_data.some(
        (product) => product.commited_qty !== product.delivered_qty
      );

      const isWarningNonNCR = props.rows.order_information.region_id !== 2;

      setWarningMismatch(isWarningMismatch);
      setwarningNonNCR(isWarningNonNCR);
    }
  }, [props.rows.product_data]);

  const handleUpdateBilling = () => {
    const updateBillingOrderParam: updateBillingOrderParam = {
      id: props.orderId,
      remarks: remarks,
      uploadedGoodsReceipt: uploadedGoodsReceipt ?? "",
      uploadedRegionReceipt: uploadedRegionReceipt ?? "",
      withNewSI: uploadedGoodsReceipt || uploadedRegionReceipt ? true : false,
    };

    dispatch(updateBillingOrders(updateBillingOrderParam));

    document.body.classList.remove("overflow-hidden");
    props.onClose(true);
  };

  return (
    <>
      <div className="px-3 space-y-2">
        <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />

        <div
          className={`${
            warningMismatch ? "" : "hidden"
          } space-x-2 border border-gray-200 rounded-lg shadow-md px-5 py-2 border-l-8 border-l-tertiary`}
        >
          <span className="font-semibold">Warning:</span>
          <span className="text-sm">
            Dispatch quantity and delivered quantity does not match. Must upload
            updated sales invoice
          </span>
        </div>

        <div
          className={`${
            warningNonNCR ? "" : "hidden"
          } space-x-2 border border-gray-200 rounded-lg shadow-md px-5 py-2 border-l-8 border-l-tertiary`}
        >
          <span className="font-semibold">Warning:</span>
          <span className="text-sm">
            Store location is not in NCR region. Must upload updated sales
            invoice
          </span>
        </div>

        <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0">
          <div className="basis-1/2">
            <Button
              onClick={() => {
                const id = props.orderId;
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
              isValidFile(uploadedGoodsReceipt, false)) ||
            (!warningMismatch &&
              warningNonNCR &&
              isValidFile(uploadedRegionReceipt, false)) ||
            (warningMismatch &&
              warningNonNCR &&
              isValidFile(uploadedGoodsReceipt, false) &&
              isValidFile(uploadedRegionReceipt, false)) ||
            (!warningMismatch && !warningNonNCR) ? (
              <div className="space-y-1">
                <Button
                  onClick={() => setOpenPopupModal(true)}
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
                      onClick={() => setOpenUploadRegionReceiptModal(true)}
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
                  !isValidFile(uploadedGoodsReceipt, false) && (
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
                  !isValidFile(uploadedRegionReceipt, false) && (
                    <Button
                      id="region"
                      onClick={() => setOpenUploadRegionReceiptModal(true)}
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

      <UploadDeliveryRecieptModal
        open={openUploadedGoodsReceipt}
        onClose={() => setUploadedGoodsReceiptModal(false)}
        setUploadedReciept={setUploadedGoodsReceipt}
        isButtonAvailable={true}
      />

      <UploadDeliveryRecieptModal
        open={openUploadRegionReceiptModal}
        onClose={() => setOpenUploadRegionReceiptModal(false)}
        setUploadedReciept={setUploadedRegionReceipt}
        isButtonAvailable={true}
      />

      <PopupModal
        open={openPopupModal}
        title={"Confirmation"}
        message={<span>Are you sure you want to confirm ?</span>}
        handleYesButton={handleUpdateBilling}
        handleNoButton={() => setOpenPopupModal(false)}
      />
    </>
  );
}
