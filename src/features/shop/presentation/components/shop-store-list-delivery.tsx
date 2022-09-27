import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import {
  selectSetStoreAndAddress,
  setStoreAndAddress,
  SetStoreAndAddressState,
} from "features/shared/presentation/slices/set-store-and-address.slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectGetStoresAvailableSnackshop } from "../slices/get-stores-available-snackshop.slice";

interface StoreListDeliveryProps {
  address: string | null;
}

export function ShopStoreListDelivery(props: StoreListDeliveryProps) {
  const getStoresAvailableSnackshopState = useAppSelector(
    selectGetStoresAvailableSnackshop
  );
  const setStoreAndAddressState = useAppSelector(selectSetStoreAndAddress);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (setStoreAndAddressState.status === SetStoreAndAddressState.success) {
      dispatch(getSession()).then(() => {
        navigate("products");
      });
      document.body.classList.remove("overflow-hidden");
    }
  }, [setStoreAndAddressState, navigate]);

  const storeClicked = (storeId: number, regionId: number) => {
    if (props.address) {
      dispatch(
        setStoreAndAddress({
          address: props.address,
          storeId,
          regionId,
          service: "SNACKSHOP",
        })
      );
    } else {
      dispatch(
        popUpSnackBar({
          message: "Search address is required",
          severity: "error",
        })
      );
    }
  };

  return (
    <section className="text-white">
      {getStoresAvailableSnackshopState.data.map((store_cluster, index) => (
        <div key={index} className="space-y-3">
          <h1 className="text-sm font-normal">{store_cluster.region_name}</h1>
          <section className="grid grid-cols-2 gap-4 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {store_cluster.stores.map((store, index) => {
              const distance_in_km = Math.ceil(
                store.store_distance * 1.609344 +
                  store.store_distance * 1.609344 * 0.5
              );

              const store_availability = distance_in_km > 10;

              return (
                <button
                  key={index}
                  onClick={
                    store_availability && props.address != null
                      ? () => {}
                      : () =>
                          storeClicked(store.store_id, store.region_store_id)
                  }
                  className={`bg-secondary h-full shadow-tertiary flex items-center justify-start flex-col shadow-md rounded-[10px] relative`}
                >
                  {store_availability &&
                  props.address != null &&
                  props.address !== "" ? (
                    <span className="p-1 text-center not-available-overlay rounded-[10px]">
                      Store not within reach
                    </span>
                  ) : null}
                  <div className="py-1 text-sm uppercase">
                    {store.menu_name}
                  </div>

                  {props.address ? (
                    <div className="absolute flex flex-col items-stretch w-full mt-8 space-y-2">
                      <div className="flex justify-end">
                        <span className="px-2 text-sm bg-secondary">
                          {distance_in_km} KM
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {store.store_image ? (
                    <img
                      src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/store_images/250/${store.store_image}`}
                      alt=""
                      className="w-full sm::w-[250px] sm::h-[250px] object-fit"
                    />
                  ) : (
                    <img
                      src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/store_images/250/blank.jpg`}
                      alt=""
                      className="w-full sm::w-[250px] sm::h-[250px] object-fit"
                    />
                  )}
                  <div className="p-4 space-y-2">
                    <h1 className="mb-1 text-sm font-bold leading-5">
                      {store.store_name}
                    </h1>
                    <p className="text-xs">{store.store_address}</p>
                  </div>
                </button>
              );
            })}
          </section>
        </div>
      ))}
    </section>
  );
}
