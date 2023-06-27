import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { Button } from "@mui/material";
import { useState } from "react";
import { AddBillingInformationModal } from "./add-billing-information.modal";
import { PayBillingModal } from "./pay-your-billing.modal";

interface TableRow {
  id: number;
  productId: string;
  productName: string;
  uom: string;
  cost: string;
  orderQty: string;
  currentStock: string;
  commitedQuantity: string;
  deliveredQuantity: string;
}

interface SupplierConfirmModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
}

export function SupplierConfirmModal(props: SupplierConfirmModalProps) {
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

  const [rows, setRows] = useState<TableRow[]>([
    {
      id: 1,
      productId: "-",
      productName: "-",
      uom: "-",
      cost: "-",
      orderQty: "-",
      currentStock: "-",
      commitedQuantity: "0",
      deliveredQuantity: "-",
    },
  ]);

  //DISPATCH BILLING INFORMATION HERE

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  console.log(uploadedReceipt);
  console.log(billingInformation);

  return (
    <>
      <div
        id="place-order-modal"
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Payment</span>
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
                    View payment information
                  </Button>
                </div>
                <div className="basis-1/2">
                  <Button
                    onClick={() => {
                      //dispatch

                      setHidden(true);
                    }}
                    fullWidth
                    variant="contained"
                  >
                    Validate
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
        isButtonAvailable={false}
      />
    </>
  );
}
