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
import {
  selectStoreChooserModal,
  setAddressStoreChooserModal,
} from "../slices/store-chooser-modal.slice";

interface StoreChooserModalProps {
  open: boolean;
  onClose: any;
}

export function StoreChooserModal(props: StoreChooserModalProps) {
  const dispatch = useAppDispatch();
  const storeChooserModalState = useAppSelector(selectStoreChooserModal);

  useEffect(() => {
    dispatch(getSession());
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
      <div className="bg-primary px-3 py-[30px] round w-[90%] lg:w-[80%] mt-10 relative rounded-[10px]">
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
          Which store do you want to have your snacks delivered?
        </h1>

        <div className="flex items-center justify-center mb-3">
          <label className="w-full pure-material-textfield-outlined">
            <SearchAddress
              value={
                storeChooserModalState.address
                  ? storeChooserModalState.address
                  : ""
              }
              onChange={(value: string) => {
                dispatch(setAddressStoreChooserModal({ address: value }));
              }}
              onPlaceSelected={(place: string) => {
                dispatch(setAddressStoreChooserModal({ address: place }));
                dispatch(
                  getStoresAvailablePopClub({
                    address: place,
                    service: "SNACKSHOP",
                  })
                );
              }}
            />
            <span>Search Address</span>
          </label>
        </div>
        <StoreCluster
          onClose={props.onClose}
          address={
            storeChooserModalState.address ? storeChooserModalState.address : ""
          }
        ></StoreCluster>
      </div>
    </div>
  );
}
