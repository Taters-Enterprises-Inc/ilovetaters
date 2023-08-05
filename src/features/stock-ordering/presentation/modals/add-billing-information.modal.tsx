import { IoMdClose } from "react-icons/io";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface AddBillingInformationModalProps {
  open: boolean;
  onClose: () => void;
  setBillingInformation: (billingInfo: {
    billing_id: string;
    billing_amount: string;
  }) => void;
}

export function AddBillingInformationModal(
  props: AddBillingInformationModalProps
) {
  const [billingId, setBillingId] = useState("");
  const [billingAmount, setBillingAmount] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    //Dispatch Data to save billing information for future references

    props.setBillingInformation({
      billing_id: billingId,
      billing_amount: billingAmount,
    });

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
        id="place-order-modal"
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-[97%] lg:w-[25%] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Add Billing Information</span>
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
              <div className="flex flex-col">
                <span>Add Billing ID: </span>
                <TextField
                  value={billingId}
                  onChange={(event) => {
                    setBillingId(event.target.value);
                  }}
                  variant="outlined"
                  size="small"
                  placeholder="Billing ID"
                  fullWidth
                  required
                />
              </div>

              <div className="flex flex-col">
                <span>Add Billing Amount: </span>
                <TextField
                  value={billingAmount}
                  onChange={(event) => {
                    setBillingAmount(event.target.value);
                  }}
                  variant="outlined"
                  size="small"
                  placeholder="Billing Amount"
                  fullWidth
                  required
                />
              </div>

              <div>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    bgcolor: "#CC5801",
                    "&:hover": {
                      bgcolor: "#9C4100",
                    },
                  }}
                  variant="contained"
                >
                  Save Data
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
