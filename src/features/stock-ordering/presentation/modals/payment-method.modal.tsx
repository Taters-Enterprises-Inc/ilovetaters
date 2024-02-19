import { IoMdClose } from "react-icons/io";

interface PaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaymentMethodModal(props: PaymentMethodModalProps) {
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
        className="fixed  -top-5 inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
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
        </div>
      </div>
    </>
  );
}
