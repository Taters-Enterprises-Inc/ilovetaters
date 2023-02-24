import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { IoMdClose } from "react-icons/io";
import {
  closeMessageModal,
  selectMessageModal,
} from "../slices/message-modal.slice";

export interface MessageModalButtonProps {
  text: string;
  color: string;
  onClick: () => void;
}

export function MessageModal() {
  const dispatch = useAppDispatch();
  const messageModalState = useAppSelector(selectMessageModal);

  if (messageModalState.status) {
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
            dispatch(closeMessageModal());
          }}
        >
          <IoMdClose />
        </button>

        <div className="mt-2 leading-tight">
          {messageModalState.data.message}
        </div>

        <div className="flex items-center justify-end mt-4 space-x-2">
          {messageModalState.data.buttons?.map((button) => (
            <button
              onClick={button.onClick}
              style={{
                background: button.color,
              }}
              className="py-1 w-[100px] font-bold  rounded-full text-white"
            >
              {button.text}
            </button>
          ))}

          {/* <button
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
          </button> */}
        </div>
      </div>
    </div>
  );
}
