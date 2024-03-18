import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { updateBillingOrderParam } from "features/stock-ordering/core/stock-ordering.params";
import { useEffect, useState } from "react";
import { StockOrderRemarks, StockOrderUploadFile } from ".";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import {
  REACT_APP_DOMAIN_URL,
  STOCK_ORDERING_BUTTON_STYLE,
} from "features/shared/constants";
import { updateBillingOrders } from "../slices/update-billing-order.slice";
import { useAppDispatch } from "features/config/hooks";

import { isValidFile } from "./stock-ordering-utils";

import {
  openMessageModal,
  closeMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";

interface StockOrderProcessSupplierUpdateBillingProps {
  orderId: string;
  rows: GetProductDataModel;
  onClose: (close: boolean) => void;
}

export function StockOrderProcessSupplierUpdateBilling(
  props: StockOrderProcessSupplierUpdateBillingProps
) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [remarks, setRemarks] = useState("");
  const [uploadedGoodsReceipt, setUploadedGoodsReceipt] = useState<
    string | File
  >("");
  const [uploadedRegionReceipt, setUploadedRegionReceipt] = useState<
    string | File
  >("");
  const [uploadedPenaltyReceipt, setUploadedPenaltyReceipt] = useState<
    File | string
  >("");

  const [warningMismatch, setWarningMismatch] = useState(false);
  const [warningNonNCR, setwarningNonNCR] = useState(false);
  const [warningPenalty, setWarningPenalty] = useState(false);

  useEffect(() => {
    if (
      props.rows.product_data &&
      (uploadedGoodsReceipt === "" || uploadedRegionReceipt === "")
    ) {
      const isWarningMismatch = props.rows.product_data.some(
        (product) => product.commited_qty !== product.delivered_qty
      );

      const isWarningNonNCR = props.rows.order_information.region_id !== 2;
      const isWarningPenalty = Boolean(props.rows.order_information.penalty);

      setWarningMismatch(
        isWarningMismatch && Boolean(isWarningPenalty) === false
      );
      setwarningNonNCR(isWarningNonNCR);
      setWarningPenalty(isWarningPenalty);
    }
  }, [props.rows.product_data]);

  const handleUpdateBilling = () => {
    dispatch(
      openMessageModal({
        message: `Are you sure you want to confirm ?`,
        buttons: [
          {
            color: "#CC5801",
            text: "Yes",
            onClick: () => {
              const updateBillingOrderParam: updateBillingOrderParam = {
                id: props.orderId,
                remarks: remarks,
                uploadedGoodsReceipt: uploadedGoodsReceipt ?? "",
                uploadedRegionReceipt: uploadedRegionReceipt ?? "",
                uploadedPenaltyReceipt: uploadedPenaltyReceipt ?? "",
                withNewSI:
                  uploadedGoodsReceipt || uploadedRegionReceipt ? true : false,
              };

              dispatch(updateBillingOrders(updateBillingOrderParam));

              document.body.classList.remove("overflow-hidden");
              props.onClose(true);
              dispatch(closeMessageModal());
            },
          },
          {
            color: "#22201A",
            text: "No",
            onClick: () => {
              dispatch(closeMessageModal());
            },
          },
        ],
      })
    );
  };

  const penaltyAndRegionFileCheck =
    warningNonNCR &&
    isValidFile(uploadedPenaltyReceipt, false) &&
    isValidFile(uploadedRegionReceipt, false);

  const penaltyFileCheck =
    !warningNonNCR && isValidFile(uploadedPenaltyReceipt, false);

  const mismatchAndRegionFileCheck =
    warningMismatch &&
    warningNonNCR &&
    isValidFile(uploadedGoodsReceipt, false) &&
    isValidFile(uploadedRegionReceipt, false);

  const mismatchFileCheck =
    warningMismatch &&
    !warningNonNCR &&
    isValidFile(uploadedGoodsReceipt, false);
  const regionFileCheck =
    !warningMismatch &&
    warningNonNCR &&
    isValidFile(uploadedRegionReceipt, false);

  const noMismatchAndNonNCR = !warningMismatch && !warningMismatch;

  console.log(mismatchAndRegionFileCheck);

  return (
    <>
      <div className="px-3 space-y-2">
        <StockOrderRemarks remarks={remarks} setRemarks={setRemarks} />

        <div
          className={`${
            warningPenalty ? "" : "hidden"
          } space-x-2 border border-gray-200 rounded-lg shadow-md px-5 py-2 border-l-8 border-l-tertiary`}
        >
          <span className="font-semibold">Warning:</span>
          <span className="text-sm">
            The store is required to pay first. Please upload sales invoice.
          </span>
        </div>

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
          {warningPenalty ? (
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap  w-full md:flex-nowrap md:space-x-3">
                <StockOrderUploadFile
                  excelFile
                  uploadButtonName={"Payable sales invoice"}
                  uploadedImage={(uploadedFile: File | string) =>
                    setUploadedPenaltyReceipt(uploadedFile)
                  }
                />

                <StockOrderUploadFile
                  excelFile
                  uploadButtonName={"Region sales invoice"}
                  hidden={!warningNonNCR}
                  uploadedImage={(uploadedFile: File | string) =>
                    setUploadedRegionReceipt(uploadedFile)
                  }
                />

                {(penaltyAndRegionFileCheck || penaltyFileCheck) && (
                  <div className="w-full flex items-center">
                    <Button
                      fullWidth
                      onClick={handleUpdateBilling}
                      variant="contained"
                      size={isMobile ? "small" : "large"}
                      style={{
                        color: "white",
                        backgroundColor: "#CC5801",
                      }}
                    >
                      Confirm and submit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex w-full space-x-3">
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap w-full md:flex-nowrap md:space-x-3">
                  <StockOrderUploadFile
                    excelFile
                    uploadButtonName={"Goods sales invoice"}
                    hidden={!warningMismatch}
                    uploadedImage={(uploadedFile: File | string) =>
                      setUploadedGoodsReceipt(uploadedFile)
                    }
                  />

                  <StockOrderUploadFile
                    excelFile
                    uploadButtonName={"Region sales invoice"}
                    hidden={!warningNonNCR}
                    uploadedImage={(uploadedFile: File | string) =>
                      setUploadedRegionReceipt(uploadedFile)
                    }
                  />

                  {(mismatchAndRegionFileCheck ||
                    mismatchFileCheck ||
                    regionFileCheck ||
                    noMismatchAndNonNCR) && (
                    <div className="w-full flex items-center">
                      <Button
                        fullWidth
                        onClick={handleUpdateBilling}
                        variant="contained"
                        size={isMobile ? "small" : "large"}
                        style={{
                          color: "white",
                          backgroundColor: "#CC5801",
                        }}
                      >
                        Confirm and submit
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
