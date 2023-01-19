import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { SnacksDeliveredDealStoreCluster } from "../components";
import { SearchAddress } from "../../../shared/presentation/components/search-address";
import { IoMdClose } from "react-icons/io";
import { getSnacksDeliveredDealAvailableStores } from "../slices/get-snacks-delivered-deal-available-stores.slice";
import {
  selectSnacksDeliveredDealStoreChooserModal,
  setAddressSnacksDeliveredDealStoreChooserModal,
} from "../slices/snacks-delivered-deal-store-chooser-modal.slice";
import { PopclubHeroCarousel } from "../components/popclub-hero.carousel";
import { selectGetDeal } from "../slices/get-deal.slice";

interface SnacksDeliveredDealStoreChooserModalProps {
  open: boolean;
  onClose: any;

  // If this function exist it will not navigate to default
  onDefaultStoreSelectHandler?: () => void;
}

export function SnacksDeliveredDealStoreChooserModal(
  props: SnacksDeliveredDealStoreChooserModalProps
) {
  const dispatch = useAppDispatch();
  const snacksDeliveredDealStoreChooserModalState = useAppSelector(
    selectSnacksDeliveredDealStoreChooserModal
  );
  const getDealState = useAppSelector(selectGetDeal);

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

        <div className="flex items-center justify-center mb-3">
          <label className="w-full pure-material-textfield-outlined">
            <SearchAddress
              value={
                snacksDeliveredDealStoreChooserModalState.address
                  ? snacksDeliveredDealStoreChooserModalState.address
                  : ""
              }
              onDenied={() => {
                if (getDealState.data?.hash) {
                  dispatch(
                    getSnacksDeliveredDealAvailableStores({
                      address: null,
                      service: "POPCLUB-ONLINE-DELIVERY",
                      hash: getDealState.data.hash,
                    })
                  );
                }
              }}
              onPrompt={() => {
                if (getDealState.data?.hash) {
                  dispatch(
                    getSnacksDeliveredDealAvailableStores({
                      address: null,
                      service: "POPCLUB-ONLINE-DELIVERY",
                      hash: getDealState.data.hash,
                    })
                  );
                }
              }}
              onLocateCurrentAddress={(place: string) => {
                if (getDealState.data?.hash) {
                  dispatch(
                    setAddressSnacksDeliveredDealStoreChooserModal({
                      address: place,
                    })
                  );
                  dispatch(
                    getSnacksDeliveredDealAvailableStores({
                      address: place,
                      service: "POPCLUB-ONLINE-DELIVERY",
                      hash: getDealState.data.hash,
                    })
                  );
                }
              }}
              onChange={(value: string) => {
                dispatch(
                  setAddressSnacksDeliveredDealStoreChooserModal({
                    address: value,
                  })
                );
              }}
              onPlaceSelected={(place: string) => {
                if (getDealState.data?.hash) {
                  dispatch(
                    setAddressSnacksDeliveredDealStoreChooserModal({
                      address: place,
                    })
                  );
                  dispatch(
                    getSnacksDeliveredDealAvailableStores({
                      address: place,
                      service: "POPCLUB-ONLINE-DELIVERY",
                      hash: getDealState.data.hash,
                    })
                  );
                }
              }}
            />
            <span>Search Address</span>
          </label>
        </div>
        <SnacksDeliveredDealStoreCluster
          onClose={props.onClose}
          address={snacksDeliveredDealStoreChooserModalState.address}
          onDefaultStoreSelectHandler={props.onDefaultStoreSelectHandler}
        />
      </div>
    </div>
  );
}
