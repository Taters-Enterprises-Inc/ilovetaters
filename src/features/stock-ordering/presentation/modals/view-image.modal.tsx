import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

interface ViewImageModalProps {
  open: boolean;
  onClose: () => void;
  image: File | string;
}

export function ViewImageModal(props: ViewImageModalProps) {
  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="w-[97%] lg:w-[25%] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Preview</span>
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
          <div className="bg-white p-1">
            <img
              src={`https://site.test/staging/api/assets/uploads/screenshots/${props.image}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
