import { IoMdClose } from "react-icons/io";
import { CateringFaqs } from "../components";

interface CateringFaqsModalProps {
  open: boolean;
  onClose: () => void;
}
export function CateringFaqsModal(props: CateringFaqsModalProps) {
  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-paper pt-[30px] pb-16 round w-[90%] lg:w-[80%] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-secondary top-2 right-4 "
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <div className="p-4 space-y-2">
          <span className="text-secondary text-4xl font-['Bebas_Neue'] tracking-[3px]">
            Catering FAQ's
          </span>
          <CateringFaqs />
        </div>
      </div>
    </div>
  );
}
