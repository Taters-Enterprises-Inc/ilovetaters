import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { SnacksDeliveredStoreCluster } from "../components";
import { MaterialInputAddress } from "features/shared/presentation/components";
import { IoMdClose } from "react-icons/io";
import { getSnacksDeliveredAvailableStores } from "../slices/get-snacks-delivered-available-stores.slice";
import {
  selectSnacksDeliveredStoreChooserModal,
  setAddressSnacksDeliveredStoreChooserModal,
} from "../slices/snacks-delivered-store-chooser-modal.slice";
import { PopclubHeroCarousel } from "../components/popclub-hero.carousel";

interface SnacksDeliveredStoreChooserModalProps {
  open: boolean;
  onClose: any;

  // If this function exist it will not navigate to default
  onDefaultStoreSelectHandler?: () => void;
}

export function SnacksDeliveredStoreChooserModal(
  props: SnacksDeliveredStoreChooserModalProps
) {
  const dispatch = useAppDispatch();
  const snacksDeliveredStoreChooserModalState = useAppSelector(
    selectSnacksDeliveredStoreChooserModal
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
      className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm no-scrollbar no-scrollbar::-webkit-scrollbar"
    >
      <div className="bg-primary px-3 py-[30px] round w-[90%] lg:w-[80%] relative rounded-[10px] my-10">
        <button
          className="absolute text-2xl text-white top-2 right-4"
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <div className="mt-4">
          <PopclubHeroCarousel />
        </div>

        <h1 className="pt-4 text-sm text-center text-white uppercase font-['Bebas_Neue'] tracking-[2px] lg:text-lg pb-2">
          Which store do you want to have your snacks delivered?
        </h1>
        <MaterialInputAddress
          geolocate={true}
          colorTheme="white"
          value={
            snacksDeliveredStoreChooserModalState.address
              ? snacksDeliveredStoreChooserModalState.address
              : ""
          }
          onDenied={() => {
            dispatch(
              getSnacksDeliveredAvailableStores({
                address: null,
                service: "POPCLUB-ONLINE-DELIVERY",
              })
            );
          }}
          onPrompt={() => {
            dispatch(
              getSnacksDeliveredAvailableStores({
                address: null,
                service: "POPCLUB-ONLINE-DELIVERY",
              })
            );
          }}
          onLocateCurrentAddress={(location) => {
            dispatch(
              setAddressSnacksDeliveredStoreChooserModal({
                address: location.formattedAddress,
              })
            );
            dispatch(
              getSnacksDeliveredAvailableStores({
                address: location.formattedAddress,
                service: "POPCLUB-ONLINE-DELIVERY",
              })
            );
          }}
          onChange={(value: string) => {
            dispatch(
              setAddressSnacksDeliveredStoreChooserModal({ address: value })
            );
          }}
          onPlaceSelected={(location) => {
            dispatch(
              setAddressSnacksDeliveredStoreChooserModal({
                address: location.formattedAddress,
              })
            );
            dispatch(
              getSnacksDeliveredAvailableStores({
                address: location.formattedAddress,
                service: "POPCLUB-ONLINE-DELIVERY",
              })
            );
          }}
        />
        <SnacksDeliveredStoreCluster
          onClose={props.onClose}
          address={snacksDeliveredStoreChooserModalState.address}
          onDefaultStoreSelectHandler={props.onDefaultStoreSelectHandler}
        />
      </div>
    </div>
  );
}
