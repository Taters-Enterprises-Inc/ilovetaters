import * as React from "react";
import { useAppDispatch } from "features/config/hooks";
import { getAllAvailableStores } from "../slices/get-all-available-stores.slice";
import { StoreClusterStoreVisit } from "../components";
import { IoMdClose } from "react-icons/io";

interface StoreVisitStoreChooserModalProps {
  open: boolean;
  onClose: () => void;
}

export function StoreVisitStoreChooserModal(
  props: StoreVisitStoreChooserModalProps
) {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllAvailableStores({ address: null }));
  }, [dispatch]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div
      style={{ display: props.open ? "flex" : "none" }}
      className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="bg-primary px-3 py-[13px] lg:p-8 round w-[90%] lg:w-[80%] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-white top-2 right-4"
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>
        <h1 className="pt-4 pb-2 text-sm font-bold text-center text-white">
          Which store are you visiting?
        </h1>
        <StoreClusterStoreVisit
          onClose={props.onClose}
          address={null}
        ></StoreClusterStoreVisit>
      </div>
    </div>
  );
}
