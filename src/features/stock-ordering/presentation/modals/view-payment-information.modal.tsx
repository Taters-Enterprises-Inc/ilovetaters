import { IoMdClose } from "react-icons/io";
import { Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import { UploadFile } from "features/shared/presentation/components";

interface ViewPaymentInformationProps {
  open: boolean;
  onClose: () => void;
  setUploadedReciept: ((file: File | string) => void) | undefined;

  billingInformation: {
    billing_id: string;
    billing_amount: string;
  };
}

export function ViewPaymentInformation(props: ViewPaymentInformationProps) {
  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    props.setUploadedReciept?.(uploadedReceipt);

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
        id="place-order-modal"
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-[97%] lg:w-[25%] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">
              View Payment Information
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

          <form onSubmit={handleSubmit}>
            <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
              <div className="flex flex-row space-x-5">
                <span className="font-semibold">Billing ID: </span>
                <span>{props.billingInformation.billing_id}</span>
              </div>

              <div className="flex flex-row space-x-5">
                <span className="font-semibold">Billing Amount: </span>
                <span>{props.billingInformation.billing_amount}</span>
              </div>

              <Divider />
              <div>
                {/* temporary */}
                <UploadFile
                  image={uploadedReceipt}
                  onChange={(file) => {
                    setUploadedReciept(file);
                  }}
                  description="DeliveryReciept"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
