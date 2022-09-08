import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeals } from "../slices/get-deals.slice";
import { selectGetStoresAvailablePopClub } from "../slices/get-stores-available-popclub.slice";
import {
  selectSetStoreAndAddressPopClub,
  setStoreAndAddressPopClub,
  SetStoreAndAddressPopClubState,
} from "../slices/set-store-and-address-popclub.slice";

interface StoreClusterProps {
  onClose: any;
  address: string;
}

export function StoreCluster(props: StoreClusterProps) {
  const getStoresAvailablePopClubState = useAppSelector(
    selectGetStoresAvailablePopClub
  );
  const setStoreAndAddressPopClubState = useAppSelector(
    selectSetStoreAndAddressPopClub
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { platform } = useParams();
  const query = useQuery();
  const category = query.get("category");

  useEffect(() => {
    if (
      setStoreAndAddressPopClubState.status ===
      SetStoreAndAddressPopClubState.success
    ) {
      if (platform !== undefined && category !== null) {
        dispatch(
          getDeals({ platform_url_name: platform, category_url_name: category })
        );
      }
    }
  }, [setStoreAndAddressPopClubState, dispatch, category, platform]);

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
      if (platform === "store-visit") {
        navigate(`../popclub/online-delivery?category=all`);
      } else {
        navigate(`?category=all`);
      }
    } else {
      navigate(`/popclub/online-delivery?category=all`);
    }
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <section className="text-white ">
      {getStoresAvailablePopClubState.data.map((store_cluster, index) => (
        <div key={index}>
          <h1 className="pl-2 text-sm font-normal">
            {store_cluster.region_name}
          </h1>
          <section className="grid grid-cols-2 gap-1 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 ">
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

                  <div className="absolute flex flex-col items-stretch w-full mt-8 space-y-2">
                    <div className="flex justify-end">
                      <span className="px-2 text-sm bg-secondary">
                        {distance_in_km} KM
                      </span>
                    </div>
                  </div>
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
