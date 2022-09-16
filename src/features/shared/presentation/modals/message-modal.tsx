import { IoMdClose } from "react-icons/io";

interface MessageModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
  onYes: () => void;
}

export function MessageModal(props: MessageModalProps) {
  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-paper px-4 pt-[30px] pb-3 round w-[90%] lg:w-[500px] mt-10 relative rounded-xl">
        <button
          className="absolute text-2xl text-secondary top-2 right-4"
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <div className="mt-2 leading-tight">{props.message}</div>

        <div className="flex items-center justify-end mt-4 space-x-2">
          <button
            onClick={props.onClose}
            className="py-1 w-[100px] font-bold bg-secondary rounded-full text-white"
          >
            No
          </button>
          <button
            onClick={props.onYes}
            className="py-1 w-[100px] text-white bg-button font-bold rounded-full"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
