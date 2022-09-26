import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getAllAvailableStores } from "../slices/get-all-available-stores.slice";
import { StoreClusterStoreVisit } from "../components";
import { IoMdClose } from "react-icons/io";
import { SearchAddress } from "features/shared/presentation/components";
import {
  selectStoreVisitStoreChooserModal,
  setAddressStoreVisitStoreChooserModal,
} from "../slices/store-visit-store-chooser-modal.slice";
import { getStoresAvailablePopClubStoreVisit } from "../slices/get-stores-available-popclub-store-visit.slice";

interface StoreVisitStoreChooserModalProps {
  open: boolean;
  onClose: () => void;
}

export function StoreVisitStoreChooserModal(
  props: StoreVisitStoreChooserModalProps
) {
  const dispatch = useAppDispatch();
  const storeVisitStoreChooserModalState = useAppSelector(
    selectStoreVisitStoreChooserModal
  );

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

        <div className="flex items-center justify-center mb-3">
          <label className="w-full pure-material-textfield-outlined">
            <SearchAddress
              value={
                storeVisitStoreChooserModalState.address
                  ? storeVisitStoreChooserModalState.address
                  : ""
              }
              onDenied={() => {
                dispatch(
                  getStoresAvailablePopClubStoreVisit({
                    address: null,
                    service: "POPCLUB-STORE-VISIT",
                  })
                );
              }}
              onPrompt={() => {
                dispatch(
                  getStoresAvailablePopClubStoreVisit({
                    address: null,
                    service: "POPCLUB-STORE-VISIT",
                  })
                );
              }}
              onLocateCurrentAddress={(place: string) => {
                dispatch(
                  setAddressStoreVisitStoreChooserModal({ address: place })
                );
                dispatch(
                  getStoresAvailablePopClubStoreVisit({
                    address: place,
                    service: "POPCLUB-STORE-VISIT",
                  })
                );
              }}
              onChange={(value: string) => {
                dispatch(
                  setAddressStoreVisitStoreChooserModal({ address: value })
                );
              }}
              onPlaceSelected={(place: string) => {
                dispatch(
                  setAddressStoreVisitStoreChooserModal({ address: place })
                );
                dispatch(
                  getStoresAvailablePopClubStoreVisit({
                    address: place,
                    service: "POPCLUB-STORE-VISIT",
                  })
                );
              }}
            />
            <span>Search Address</span>
          </label>
        </div>
        <StoreClusterStoreVisit
          onClose={props.onClose}
          address={
            storeVisitStoreChooserModalState.address
              ? storeVisitStoreChooserModalState.address
              : ""
          }
        ></StoreClusterStoreVisit>
      </div>
    </div>
  );
}
