import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { MaterialInput } from "features/shared/presentation/components";

interface ProfileCashoutModalProps {
  open: boolean;
  onClose: () => void;
  onCashout: (cashout: string) => void;
}

export function ProfileCashoutModal(props: ProfileCashoutModalProps) {
  const [cashout, setCashout] = useState("");

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[400px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">Cashout</span>
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

        <div className="px-4 pt-6 pb-2 space-y-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
          <MaterialInput
            colorTheme="black"
            name="cashout"
            label="Cashout"
            fullWidth
            value={cashout}
            onChange={(e) => {
              setCashout(e.target.value);
            }}
          />
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => {
                props.onCashout(cashout);
              }}
              className="w-[100px] py-1 text-white rounded-full bg-button"
            >
              Cashout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
