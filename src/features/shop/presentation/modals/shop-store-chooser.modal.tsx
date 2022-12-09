import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { ShopStoreCluster } from "../components";
import { SearchAddress } from "../../../shared/presentation/components/search-address";
import { IoMdClose } from "react-icons/io";
import {
  selectShopStoreChooserModal,
  setAddressShopStoreChooserModal,
} from "features/shop/presentation/slices/shop-store-chooser-modal.slice";
import { getStoresAvailableSnackshopModal } from "../slices/get-stores-available-snackshop-modal.slice";
import { ShopHeroCarousel } from "../carousels";
interface StoreChooserModalProps {
  open: boolean;
  onClose: any;

  // If this function exist it will not navigate to default
  onDefaultStoreSelectHandler?: () => void;
}

export function ShopStoreChooserModal(props: StoreChooserModalProps) {
  const dispatch = useAppDispatch();
  const shopStoreChooserModalState = useAppSelector(
    selectShopStoreChooserModal
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
          <ShopHeroCarousel />
        </div>

        <h1 className='text-white text-sm lg:text-lg pt-4 pb-2 font-["Bebas_Neue"] tracking-[2px]'>
          Please search your address for delivery
        </h1>

        <SearchAddress
          value={
            shopStoreChooserModalState.address
              ? shopStoreChooserModalState.address
              : ""
          }
          onDenied={() => {
            dispatch(
              getStoresAvailableSnackshopModal({
                address: null,
                service: "SNACKSHOP",
              })
            );
          }}
          onPrompt={() => {
            dispatch(
              getStoresAvailableSnackshopModal({
                address: null,
                service: "SNACKSHOP",
              })
            );
          }}
          onLocateCurrentAddress={(place: string) => {
            dispatch(setAddressShopStoreChooserModal({ address: place }));
            dispatch(
              getStoresAvailableSnackshopModal({
                address: place,
                service: "SNACKSHOP",
              })
            );
          }}
          onChange={(value: string) => {
            dispatch(setAddressShopStoreChooserModal({ address: value }));
          }}
          onPlaceSelected={(place: string) => {
            dispatch(setAddressShopStoreChooserModal({ address: place }));
            dispatch(
              getStoresAvailableSnackshopModal({
                address: place,
                service: "SNACKSHOP",
              })
            );
          }}
        />
        <ShopStoreCluster
          onClose={props.onClose}
          address={shopStoreChooserModalState.address}
          onDefaultStoreSelectHandler={props.onDefaultStoreSelectHandler}
        />
      </div>
    </div>
  );
}
