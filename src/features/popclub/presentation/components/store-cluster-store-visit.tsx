import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectGetAllAvailableStores } from "../slices/get-all-available-stores.slice";
import {
  selectSetStoreAndAddressPopClub,
  setStoreAndAddressPopClub,
} from "../slices/set-store-and-address-popclub.slice";

interface StoreClusterProps {
  onClose: any;
  address: string | null;
}

export function StoreClusterStoreVisit(props: StoreClusterProps) {
  const getAllAvailableStoresState = useAppSelector(
    selectGetAllAvailableStores
  );
  const dispatch = useAppDispatch();
  const setStoreAndAddressPopClubState = useAppSelector(
    selectSetStoreAndAddressPopClub
  );
  const navigate = useNavigate();
  let { platform } = useParams();

  const storeClicked = (storeId: number, regionId: number) => {
    dispatch(
      setStoreAndAddressPopClub({
        address: props.address,
        storeId,
        regionId,
        service: "SNACKSHOP",
      })
    );
    props.onClose();

    if (platform) {
      if (platform === "online-delivery") {
        navigate(`/popclub/store-visit?category=all`);
      } else {
        navigate(`?category=all`);
      }
    } else {
      navigate(`/popclub/store-visit?category=all`);
    }

    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    dispatch(getSession());
  }, [setStoreAndAddressPopClubState, dispatch]);

  return (
    <section className="text-white ">
      {getAllAvailableStoresState.data.map((store_cluster, index) => (
        <div key={index}>
          <h1 className="pl-2 text-sm font-normal">
            {store_cluster.region_name}
          </h1>
          <section className="grid grid-cols-2 gap-1 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
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
                  className={`bg-secondary shadow-tertiary flex items-center justify-start flex-col shadow-md rounded-[10px] m-[7px] lg:mb-4 relative ${
                    store_availability && props.address != null
                      ? "store-not-available"
                      : ""
                  }`}
                >
                  {store_availability && props.address != null ? (
                    <span className="p-1 text-center not-within-reach-text ">
                      Store not within reach
                    </span>
                  ) : null}
                  <div className="text-sm uppercase ">FULL MENU</div>
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/store_images/250/${store.store_image}`}
                    alt=""
                    className="w-full"
                  />
                  <div className="px-3 py-2">
                    <h1 className="mb-1 text-xs">{store.store_name}</h1>
                    <p className="text-[7px]">{store.store_address}</p>
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
