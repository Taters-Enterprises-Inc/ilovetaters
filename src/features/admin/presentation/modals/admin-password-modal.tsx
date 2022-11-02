import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { MaterialInputPassword } from "features/shared/presentation/components";

interface AdminPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onEnterPassword: (password: string) => void;
}

export function AdminPasswordModal(props: AdminPasswordModalProps) {
  const [password, setPassword] = useState<string>("");

  if (props.open) {
    const shopOrderModal = document.getElementById("shop-order-modal");
    if (shopOrderModal) {
      shopOrderModal.classList.remove("overflow-auto");
    }
  } else {
    const shopOrderModal = document.getElementById("shop-order-modal");
    if (shopOrderModal) {
      shopOrderModal.classList.add("overflow-auto");
    }
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[400px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">Enter Admin Password</span>
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

        <div className="px-4 py-2 space-y-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
          <MaterialInputPassword
            colorTheme="black"
            size="small"
            label="Password"
            value={password}
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={props.onClose}
              className="w-[100px] py-1 text-white rounded-full bg-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (password) props.onEnterPassword(password);
              }}
              className="w-[100px] py-1 text-white rounded-full bg-button"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
