import { IoMdClose } from "react-icons/io";
import SalesTaskContent from "../components/sales-task-content";

interface TaskContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function TaskContentModal(props: TaskContentModalProps) {
  const handleModalClose = () => {
    document.body.classList.remove("overflow-hidden");
    props.onClose();
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div
        id="task-content-modal"
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm "
      >
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white"></span>
            <button className="text-2xl text-white" onClick={handleModalClose}>
              <IoMdClose />
            </button>
          </div>
          <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary">
            <SalesTaskContent />
          </div>
        </div>
      </div>
    </>
  );
}
