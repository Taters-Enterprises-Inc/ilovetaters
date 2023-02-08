import { InboxModel } from "features/profile/core/domain/inbox.model";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

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

        <div className="mt-2 leading-tight">
          {props.inbox?.text}
          {props.inbox?.survey_hash &&
          props.inbox?.notification_event_type_id === 5 ? (
            <Link
              to={`/feedback/complete/${props.inbox?.survey_hash}`}
              className="underline text-primary"
            >
              {" "}
              Here
            </Link>
          ) : null}
          {props.inbox?.notification_event_type_id === 4 ? (
            <Link
              to={`/feedback${
                props.inbox?.transaction_hash
                  ? `/snackshop/${props.inbox?.transaction_hash}`
                  : props.inbox?.catering_transaction_hash
                  ? `/catering/${props.inbox?.catering_transaction_hash}`
                  : ""
              }`}
              className="underline text-primary"
            >
              {" "}
              Rate Now Here
            </Link>
          ) : null}
          {props.inbox?.notification_event_type_id === 6 ? (
            <div className="relative mt-2">
              <img
                src="https://www.ilovetaters.com/api/assets/images/home/cards/taters_branches.jpg"
                alt="gift-promo"
              />
              <span className="absolute bottom-[10px] z-10 text-2xl text-black font-bold left-[10px]">
                {props.inbox.order_no}
              </span>
            </div>
          ) : null}
        </div>

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
