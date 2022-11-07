import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { IoMdClose } from "react-icons/io";

import { MaterialInput } from "features/shared/presentation/components";
import { ChangeEvent, useState } from "react";

interface PaymentRealTimeModalModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaymentRealTimeModal(props: PaymentRealTimeModalModalProps) {
  const [cardNumber, setCardNumber] = useState("");

  const handleOnSubmit = () => {
    //HANDLE SUBMIT HERE
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white border-secondary border-2 px-4 pt-[30px] pb-3 round w-[90%] lg:w-[580px] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-secondary top-2 right-4 "
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>
        <form onSubmit={handleOnSubmit}>
          <div className="space-y-2">
            <div className="flex flex-col space-y-3 lg:items-center lg:justify-between lg:flex-row lg:space-y-0">
              <h1 className="text-2xl font-bold">Account Details</h1>
            </div>

            <MaterialInput
              colorTheme="black"
              value={cardNumber}
              autoComplete="off"
              label="Card Number"
              name="cardNumber"
              fullWidth
              required
              onChange={() => {}}
            />

            <div className="flex items-center justify-end space-x-4">
              <button
                className="font-bold"
                onClick={() => {
                  props.onClose();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 text-white rounded-full bg-button"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
