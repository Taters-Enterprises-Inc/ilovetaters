import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import {
  selectSetStoreAndAddress,
  SetStoreAndAddressState,
} from "features/shared/presentation/slices/set-store-and-address.slice";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CateringStoreChooserModalHome } from "../components/catering-store-chooser-modal-home";

interface CateringSelectStoreModalProps {
  open: boolean;
  onClose: () => void;
}
export function CateringSelectStoreModal(props: CateringSelectStoreModalProps) {
  const setStoreAndAddressState = useAppSelector(selectSetStoreAndAddress);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (setStoreAndAddressState.status === SetStoreAndAddressState.success) {
      dispatch(getSession());
      props.onClose();
      document.body.classList.remove("overflow-hidden");
    }
  }, [setStoreAndAddressState, navigate, dispatch, props]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-primary pt-[30px] pb-16 round w-[90%] lg:w-[80%] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-white top-2 right-4 "
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <CateringStoreChooserModalHome />
      </div>
    </div>
  );
}
