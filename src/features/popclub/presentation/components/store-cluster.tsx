import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectGetStoresAvailablePopClub } from "../slices/get-stores-available-popclub.slice";
import { setPopClubData } from "../slices/set-popclub-data.slice";
import {
  resetStoreAndAddressPopClub,
  selectSetStoreAndAddressPopClub,
  setStoreAndAddressPopClub,
  SetStoreAndAddressPopClubState,
} from "../slices/set-store-and-address-popclub.slice";

interface StoreClusterProps {
  onClose: any;
  address: string | null;
}

export function StoreCluster(props: StoreClusterProps) {
  const getStoresAvailablePopClubState = useAppSelector(
    selectGetStoresAvailablePopClub
  );
  const setStoreAndAddressPopClubState = useAppSelector(
    selectSetStoreAndAddressPopClub
  );
  const getSessionState = useAppSelector(selectGetSession);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { platform } = useParams();

  useEffect(() => {
    if (
      setStoreAndAddressPopClubState.status ===
      SetStoreAndAddressPopClubState.success
    ) {
      dispatch(getSession());
    }
  }, [setStoreAndAddressPopClubState]);

  useEffect(() => {
    if (
      setStoreAndAddressPopClubState.status ===
      SetStoreAndAddressPopClubState.success
    ) {
      props.onClose();

      dispatch(resetStoreAndAddressPopClub());

      dispatch(setPopClubData({ platform: "online-delivery" }));

      if (platform) {
        if (platform === "store-visit") {
          navigate(`/popclub/online-delivery?category=all`);
        } else {
          navigate(`?category=all`);
        }
      } else {
        navigate(`/popclub/online-delivery?category=all`);
      }
      document.body.classList.remove("overflow-hidden");
    }
  }, [getSessionState]);

  const storeClicked = (storeId: number, regionId: number) => {
    if (props.address) {
      dispatch(
        setStoreAndAddressPopClub({
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

              const isStoreFar = distance_in_km > 10;
              const currentTime = moment(
                moment().format("HH:mm:ss"),
                "HH:mm:ss"
              );
              const availableStartTime = moment(
                store.available_start_time,
                "HH:mm:ss"
              );
              const availableEndTime = moment(
                store.available_end_time,
                "HH:mm:ss"
              );

              const isStoreOperating = currentTime.isBetween(
                availableStartTime,
                availableEndTime
              );

              const isStoreAvailable =
                isStoreFar === false && props.address && isStoreOperating;

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (isStoreAvailable) {
                      storeClicked(store.store_id, store.region_store_id);
                    }
                  }}
                  className={`bg-secondary ${
                    isStoreAvailable == false ? "cursor-not-allowed" : ""
                  } shadow-tertiary flex items-center justify-start flex-col shadow-md rounded-[10px] m-[7px] lg:mb-4 relative`}
                >
                  {isStoreFar &&
                  props.address !== null &&
                  props.address !== "" ? (
                    <span className="p-1 text-center not-available-overlay rounded-[10px]">
                      Store not within reach
                    </span>
                  ) : isStoreOperating == false ? (
                    <span className="p-1 text-center not-available-overlay rounded-[10px]">
                      Store will be available at{" "}
                      {moment(store.available_start_time, "HH:mm:ss").format(
                        "LT"
                      )}{" "}
                      to{" "}
                      {moment(store.available_end_time, "HH:mm:ss").format(
                        "LT"
                      )}
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
                      className="w-full"
                    />
                  ) : (
                    <img
                      src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/store_images/250/blank.jpg`}
                      alt=""
                      className="w-full"
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
