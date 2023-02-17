import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectGetStoreVisitDealAvailableStore } from "../slices/get-store-visit-deal-available-stores.slice";
import { setPopClubData } from "../slices/set-popclub-data.slice";
import {
  resetStoreVisitDealStoreAndAddress,
  selectSetStoreVisitDealStoreAndAddress,
  setStoreVisitDealStoreAndAddress,
  SetStoreVisitDealStoreAndAddressState,
} from "../slices/set-store-visit-deal-store-and-address.slice";

interface StoreVisitDealStoreClusterProps {
  onClose: any;
  address: string | null;

  // If this function exist it will not navigate to default
  onDefaultStoreSelectHandler?: () => void;
}

export function StoreVisitDealStoreCluster(
  props: StoreVisitDealStoreClusterProps
) {
  const getStoreVisitDealAvailableStoreState = useAppSelector(
    selectGetStoreVisitDealAvailableStore
  );
  const dispatch = useAppDispatch();
  const setStoreVisitDealStoreAndAddressState = useAppSelector(
    selectSetStoreVisitDealStoreAndAddress
  );
  const getSessionState = useAppSelector(selectGetSession);
  const navigate = useNavigate();
  let { platform } = useParams();

  const storeClicked = (storeId: number, regionId: number) => {
    dispatch(
      setStoreVisitDealStoreAndAddress({
        address: props.address,
        storeId,
        regionId,
        service: "SNACKSHOP",
      })
    );
  };

  useEffect(() => {
    if (
      setStoreVisitDealStoreAndAddressState.status ===
      SetStoreVisitDealStoreAndAddressState.success
    ) {
      dispatch(getSession());
    }
  }, [setStoreVisitDealStoreAndAddressState]);

  useEffect(() => {
    if (
      setStoreVisitDealStoreAndAddressState.status ===
      SetStoreVisitDealStoreAndAddressState.success
    ) {
      props.onClose();

      dispatch(resetStoreVisitDealStoreAndAddress());

      dispatch(setPopClubData({ platform: "store-visit" }));

      if (props.onDefaultStoreSelectHandler === undefined) {
        if (platform) {
          if (platform === "online-delivery") {
            navigate(`/popclub/store-visit?category=all`);
          } else {
            navigate(`?category=all`);
          }
        } else {
          navigate(`/popclub/store-visit?category=all`);
        }
      } else {
        props.onDefaultStoreSelectHandler();
      }

      document.body.classList.remove("overflow-hidden");
    }
  }, [getSessionState]);

  return (
    <section className="text-white ">
      {getStoreVisitDealAvailableStoreState.search ? (
        <>
          {getStoreVisitDealAvailableStoreState.search.length > 0 ? (
            <section className="grid grid-cols-2 gap-1 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {getStoreVisitDealAvailableStoreState.search.map(
                (store, index) => {
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
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (isStoreOperating) {
                          storeClicked(store.store_id, store.region_store_id);
                        }
                      }}
                      className={`bg-secondary ${
                        isStoreOperating === false ? "cursor-not-allowed" : ""
                      } shadow-tertiary flex items-center justify-start flex-col shadow-md rounded-[10px] m-[7px] lg:mb-4 relative`}
                    >
                      {isStoreOperating == false ? (
                        <span className="p-1 text-center not-available-overlay rounded-[10px]">
                          Store will be available at{" "}
                          {moment(
                            store.available_start_time,
                            "HH:mm:ss"
                          ).format("LT")}{" "}
                          to{" "}
                          {moment(store.available_end_time, "HH:mm:ss").format(
                            "LT"
                          )}
                        </span>
                      ) : null}
                      <div className="text-sm uppercase ">
                        {store.menu_name}
                      </div>

                      <img
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/store_images/250/${store.store_image}`}
                        className="w-full"
                        alt={store.store_name}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                        }}
                      />
                      <div className="px-3 py-2">
                        <h1 className="mb-1 text-xs">{store.store_name}</h1>
                        <p className="text-[7px]">{store.store_address}</p>
                      </div>
                    </button>
                  );
                }
              )}
            </section>
          ) : (
            <h1 className="text-base font-bold text-center">
              Sorry, we couldn't find any available stores for your search.
            </h1>
          )}
        </>
      ) : (
        <>
          {getStoreVisitDealAvailableStoreState.data?.map(
            (store_cluster, index) => (
              <div key={index}>
                <h1 className="pl-2 text-sm font-normal">
                  {store_cluster.region_name}
                </h1>
                <section className="grid grid-cols-2 gap-1 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                  {store_cluster.stores.map((store, index) => {
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

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (isStoreOperating) {
                            storeClicked(store.store_id, store.region_store_id);
                          }
                        }}
                        className={`bg-secondary ${
                          isStoreOperating === false ? "cursor-not-allowed" : ""
                        } shadow-tertiary flex items-center justify-start flex-col shadow-md rounded-[10px] m-[7px] lg:mb-4 relative`}
                      >
                        {isStoreOperating == false ? (
                          <span className="p-1 text-center not-available-overlay rounded-[10px]">
                            Store will be available at{" "}
                            {moment(
                              store.available_start_time,
                              "HH:mm:ss"
                            ).format("LT")}{" "}
                            to{" "}
                            {moment(
                              store.available_end_time,
                              "HH:mm:ss"
                            ).format("LT")}
                          </span>
                        ) : null}
                        <div className="py-1 text-sm uppercase">
                          {store.menu_name}
                        </div>

                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/store_images/250/${store.store_image}`}
                          className="w-full"
                          alt={store.store_name}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                          }}
                        />
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
            )
          )}
        </>
      )}
    </section>
  );
}
