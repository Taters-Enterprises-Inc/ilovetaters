import React from "react";
import { useAppSelector } from "features/config/hooks";
import { selectGetStoresAvailable } from "features/shared/presentation/slices/get-stores-available-slice";

interface StoreListDeliveryProps {
  address: string;
}

export function NearyouSearchStore(props: StoreListDeliveryProps) {
  const getStoresAvailableState = useAppSelector(selectGetStoresAvailable);

  return (
    <section className="text-white ">
      {getStoresAvailableState.data.map((store_cluster: any, index: number) => (
        <div key={index} className="space-y-3">
          <h1 className="text-sm font-normal">{store_cluster.region_name}</h1>
          <section className="pb-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {store_cluster.stores.map((store: any, index: number) => {
              console.log(store);
              const distance_in_km = Math.ceil(
                store.store_distance * 1.609344 +
                  store.store_distance * 1.609344 * 0.5
              );

              const store_availability = distance_in_km > 10;

              return (
                <button
                  key={index}
                  className={`z-0 overflow-x-hidden bg-secondary h-full shadow-tertiary flex items-center justify-start flex-col shadow-md rounded-[10px] relative ${
                    store_availability && props.address != null
                      ? "store-not-available"
                      : ""
                  }`}
                >
                  {store_availability && props.address != null ? (
                    <span className="p-1 not-within-reach-text text-center ">
                      Store not within reach
                    </span>
                  ) : null}
                  <div className="md:text-sm text-[13px] md:h-auto h-[70px]  uppercase py-4 font-['Bebas_Neue'] tracking-[2px]">
                    {store.store_name}
                  </div>

                  <div className="absolute flex flex-col items-stretch w-full mt-8 space-y-2">
                    <div className="flex justify-end">
                      <span className="bg-secondary px-2 text-sm">
                        {distance_in_km} KM
                      </span>
                    </div>
                  </div>

                  <img
                    src={
                      store?.store_image
                        ? `https://ilovetaters.com/shop/assets/img//store_images/250/${store.store_image} `
                        : "https://ilovetaters.com/shop/assets/img//store_images/250/taters_ayalacircuit.jpg"
                    }
                    alt=""
                    className="w-full sm::w-[250px] sm::h-[250px] object-fit"
                  />

                  <div
                    style={{
                      background:
                        "linear-gradient( 0%, rgb(29, 17, 21) 45%, rgb(29, 17, 21) 100%)",
                      boxShadow:
                        store_availability && props.address != null
                          ? ""
                          : " 0px -39px 25px 13px rgba(0,0,0,0.75)",
                    }}
                    className="z-0 cursor-pointer md:flex md:px-0 px-2  container border-b border-[#7b7982] xl:h-[105px] lg:h-[130px]  h-[150px] md:h-[105px] 	z-10 relative py-2"
                  >
                    <span
                      className={`${
                        store_availability && props.address != null
                          ? "opacity-30"
                          : ""
                      } p-4 md:relative md:top-0 md:left-0  absolute top-[-2px] left-[21px]`}
                    >
                      <svg
                        className="w-4 h-4 stroke-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </span>
                    <div
                      className="text-left pt
                    -2 block pr-1 leading-[20px] "
                    >
                      <p
                        className={` ${
                          store_availability && props.address != null
                            ? "opacity-30 text-[#fff]"
                            : "text-[#bcd2d6] "
                        } text-[.8125rem] pb-1 pt-1 md:text-left text-center`}
                      >
                        Find us
                      </p>
                      <a
                        className={`${
                          store_availability && props.address != null
                            ? "opacity-30"
                            : ""
                        } text-[#fff] md:text-[12px] text-[11.9px] font-normal`}
                        href={store.mapLink}
                      >
                        {store.address}
                      </a>
                    </div>
                  </div>
                  <div className="cursor-pointer flex  border-b border-[#7b7982] w-full">
                    <span className="p-4">
                      <svg
                        className="w-4 h-4 stroke-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                    </span>
                    <div className="block text-left py-2 ">
                      <p className="text-[.7125rem] text-[#bcd2d6] pb-1 ">
                        Call us
                      </p>
                      <a
                        className="text-[#fff] text-[12px] font-normal "
                        href={`/tel:${store.contactno}`}
                      >
                        {store.contactno}
                      </a>
                    </div>
                  </div>
                  <div className="flex  md:h-[85px] h-auto py-2 w-full">
                    <span className="p-4">
                      <svg
                        className="w-4 h-4 stroke-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </span>
                    <div className="block text-left py-1 ">
                      <p className="text-[.7125rem] text-[#bcd2d6] pb-1">
                        Operating Hours
                      </p>
                      <div className="md:text-[12px] text-[11px] font-normal  text-[#fff] ">
                        <p>{store.operatinghours}</p>
                      </div>
                    </div>
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
