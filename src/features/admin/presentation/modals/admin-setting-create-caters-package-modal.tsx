import { IoMdClose } from "react-icons/io";
import { useState } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreatePackageModal(props: ModalProps) {
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
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">
            Create New Cataring Package
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

        <div className="px-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary">
          Create
        </div>
      </div>
    </div>
  );
}
