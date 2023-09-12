import { IoMdClose } from "react-icons/io";
import { ChangePassword } from "../components";

interface AdminChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminChangePasswordModal(props: AdminChangePasswordModalProps) {
  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 bg-black bg-opacity-30 backdrop-blur-sm overflow-auto flex items-start justify-center">
      <div className="w-2/3 md:w-2/6 my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="font-semibold text-lg text-white">
            Change Password
          </span>
          <IoMdClose
            color="white"
            size={25}
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          />
        </div>

        <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}
