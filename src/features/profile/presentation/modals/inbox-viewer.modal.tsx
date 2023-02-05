import { InboxModel } from "features/profile/core/domain/inbox.model";
import { IoMdClose } from "react-icons/io";

interface InboxViewerModalProps {
  open: boolean;
  inbox: InboxModel | null;
  onClose: () => void;
}

export function InboxViewerModal(props: InboxViewerModalProps) {
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

        <div className="mt-2 leading-tight">{props.inbox?.text}</div>

        <div className="flex items-center justify-end mt-4 space-x-2">
          <button
            onClick={props.onClose}
            className="py-1 w-[100px] font-bold bg-secondary rounded-full text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
