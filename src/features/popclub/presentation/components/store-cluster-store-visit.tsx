import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectGetAllAvailableStores } from "../slices/get-all-available-stores.slice";
import { selectGetStoresAvailablePopClubStoreVisit } from "../slices/get-stores-available-popclub-store-visit.slice";
import {
  selectSetStoreAndAddressPopClub,
  setStoreAndAddressPopClub,
} from "../slices/set-store-and-address-popclub.slice";

interface StoreClusterProps {
  onClose: any;
  address: string | null;
}

export function StoreClusterStoreVisit(props: StoreClusterProps) {
  const getStoresAvailablePopClubStoreVisitState = useAppSelector(
    selectGetStoresAvailablePopClubStoreVisit
  );
  const dispatch = useAppDispatch();
  const setStoreAndAddressPopClubState = useAppSelector(
    selectSetStoreAndAddressPopClub
  );
  const navigate = useNavigate();
  let { platform } = useParams();

  const storeClicked = (storeId: number, regionId: number) => {
    props.onClose();

    dispatch(
      setStoreAndAddressPopClub({
        address: props.address,
        storeId,
        regionId,
        service: "SNACKSHOP",
      })
    );

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
      {getStoresAvailablePopClubStoreVisitState.search ? (
        <>
          {getStoresAvailablePopClubStoreVisitState.search.length > 0 ? (
            <section className="grid grid-cols-2 gap-1 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {getStoresAvailablePopClubStoreVisitState.search.map(
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
                          props.onClose();
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
                          {moment(store.available_start_time).format("LT")} to{" "}
                          {moment(store.available_end_time).format("LT")}
                        </span>
                      ) : null}
                      <div className="text-sm uppercase ">
                        {store.menu_name}
                      </div>

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
          {getStoresAvailablePopClubStoreVisitState.data.map(
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
                            props.onClose();
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
                            {moment(store.available_start_time).format("LT")} to{" "}
                            {moment(store.available_end_time).format("LT")}
                          </span>
                        ) : null}
                        <div className="py-1 text-sm uppercase">
                          {store.menu_name}
                        </div>

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
            )
          )}
        </>
      )}
    </section>
  );
}
