import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StoreCluster } from "../components";
import { SearchAddress } from "../../../shared/presentation/components/search-address";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { getStoresAvailablePopClub } from "../slices/get-stores-available-popclub.slice";

interface StoreChooserModalProps {
  open: boolean;
  onClose: any;
}

export function StoreChooserModal(props: StoreChooserModalProps) {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState<any>("");
  const getSessionState = useAppSelector(selectGetSession);

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  useEffect(() => {
    if (getSessionState.data?.customer_address !== null) {
      setAddress(getSessionState.data?.customer_address);
    }
  }, [getSessionState]);

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
      <div className="bg-[#a21013] px-[10px] py-[30px] round w-[90%] lg:w-[80%] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-white top-2 right-4"
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <h1 className="pt-1 pb-2 text-sm font-bold text-center text-white">
          Which store do you want for online delivery?
        </h1>

        <div className="flex items-center justify-center mb-3">
          <label className="w-full pure-material-textfield-outlined">
            <SearchAddress
              onPlaceSelected={(place: string) => {
                setAddress(place);
                dispatch(getStoresAvailablePopClub({ address: place }));
              }}
            />
            <span>Search Address</span>
          </label>
        </div>
        <StoreCluster onClose={props.onClose} address={address}></StoreCluster>
      </div>
    </div>
  );
}
