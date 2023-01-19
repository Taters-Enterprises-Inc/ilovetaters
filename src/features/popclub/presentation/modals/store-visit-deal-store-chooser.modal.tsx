import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StoreVisitDealStoreCluster } from "../components";
import { IoMdClose } from "react-icons/io";
import { selectStoreVisitDealStoreChooserModal } from "../slices/store-visit-deal-store-chooser-modal.slice";
import { getStoreVisitDealAvailableStore } from "../slices/get-store-visit-deal-available-stores.slice";
import { useEffect } from "react";
import { StoreVisitStoreSearch } from "../components/store-visit-store-search";
import { PopclubHeroCarousel } from "../components/popclub-hero.carousel";
import { GetDealState, selectGetDeal } from "../slices/get-deal.slice";

interface StoreVisitDealStoreChooserModalProps {
  open: boolean;
  onClose: () => void;

  // If this function exist it will not navigate to default
  onDefaultStoreSelectHandler?: () => void;
}

export function StoreVisitDealStoreChooserModal(
  props: StoreVisitDealStoreChooserModalProps
) {
  const dispatch = useAppDispatch();

  const getDealState = useAppSelector(selectGetDeal);

  useEffect(() => {
    if (getDealState.status === GetDealState.success && getDealState.data) {
      dispatch(
        getStoreVisitDealAvailableStore({
          address: null,
          service: "POPCLUB-STORE-VISIT",
          hash: getDealState.data.hash,
        })
      );
    }
  }, [getDealState]);
  const storeVisitDealStoreChooserModalState = useAppSelector(
    selectStoreVisitDealStoreChooserModal
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
      <div className="bg-primary px-3 py-[13px] lg:p-8 round w-[90%] lg:w-[80%] relative rounded-[10px] lg:my-10 mt-[7%] mb-[21%] sm:mt-[5%]sm:mb-[15%]">
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
          Which store are you visiting?
        </h1>

        <div className="mb-4">
          <StoreVisitStoreSearch label="Search Store" />
        </div>

        <StoreVisitDealStoreCluster
          onClose={props.onClose}
          onDefaultStoreSelectHandler={props.onDefaultStoreSelectHandler}
          address={
            storeVisitDealStoreChooserModalState.address
              ? storeVisitDealStoreChooserModalState.address
              : ""
          }
        />
      </div>
    </div>
  );
}
