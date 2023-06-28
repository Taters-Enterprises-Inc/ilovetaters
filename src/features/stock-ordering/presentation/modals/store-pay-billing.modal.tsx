import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { Button } from "@mui/material";
import { useState } from "react";
import { AddBillingInformationModal } from "./add-billing-information.modal";
import { PayBillingModal } from "./pay-your-billing.modal";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";

interface StorePayBillingModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
}

export function StorePayBillingModal(props: StorePayBillingModalProps) {
  const [openPayBillingModal, setOpenPayBillingModal] = useState(false);
  const [isHidden, setHidden] = useState(false);
  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");

  const [billingInformation, setBillingInformation] = useState<{
    billing_id: string;
    billing_amount: string;
  }>({
    billing_id: "testId",
    billing_amount: "100",
  });

  const [rows, setRows] = useState<TableRow>({
    order_information: {
      store_name: "Taters Acacia Estate",
      order_number: "1",
      requested_delivery_date: "June 28, 2023",
      commited_delivery_date: "July 28, 2023",
      order_reviewed_date: "June 28, 2023",
      order_confirmation_date: "June 28, 2023",
      view_delivery_receipt: "image.jpg",
      dispatch_date: "July 10, 2023",
      order_enroute: "July 10, 2023",
      actual_delivery_date: "July 20, 2023",
      view_updated_delivery_receipt: "image.jpg",
      billing_information_ready: "",
      view_payment_details: "image.jpg",
      payment_confirmation: "July 20, 2023",
    },
    product_data: [
      {
        id: "1",
        productId: "1",
        productName: "Product 1",
        uom: "PACK",
        cost: "100",
        orderQty: "50",
        currentStock: "10000",
        commitedQuantity: "100",
        deliveredQuantity: "50",
      },
      {
        id: "2",
        productId: "2",
        productName: "Product 2",
        uom: "BAGS",
        cost: "50",
        orderQty: "25",
        currentStock: "500",
        commitedQuantity: "20",
        deliveredQuantity: "5",
      },
      {
        id: "3",
        productId: "3",
        productName: "Product 3",
        uom: "BAGS",
        cost: "50",
        orderQty: "25",
        currentStock: "500",
        commitedQuantity: "20",
        deliveredQuantity: "5",
      },
    ],
  });

  //DISPATCH BILLING INFORMATION HERE

  const isValidFile = (file: string | File | undefined): boolean => {
    if (!file) {
      return false;
    }

    if (typeof file === "string") {
      return true;
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
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
            />

            {isHidden ? null : (
              <div className="flex flex-row space-x-4">
                <div className="basis-1/2">
                  <Button
                    onClick={() => setOpenPayBillingModal(true)}
                    fullWidth
                    variant="contained"
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
                    onClick={() => {
                      //dispatch

                      setHidden(true);
                    }}
                    fullWidth
                    variant="contained"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <PayBillingModal
        open={openPayBillingModal}
        onClose={() => setOpenPayBillingModal(false)}
        setUploadedReciept={setUploadedReciept}
        billingInformation={{
          billing_id: billingInformation.billing_id,
          billing_amount: billingInformation.billing_amount,
        }}
        isButtonAvailable={true}
      />
    </>
  );
}
