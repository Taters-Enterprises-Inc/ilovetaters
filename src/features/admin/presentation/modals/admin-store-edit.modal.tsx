import { IoMdClose } from "react-icons/io";

interface AdminStoreEditModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminStoreEditModal(props: AdminStoreEditModalProps) {
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
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="px-4 py-2 space-y-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={props.onClose}
              className="w-[100px] py-1 text-white rounded-full bg-secondary"
            >
              Cancel
            </button>
            <button className="w-[100px] py-1 text-white rounded-full bg-button">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
