import React, { useEffect, useState } from "react";
import { StoreType } from "./near-you-search-store";
import { useNavigate } from "react-router-dom";
export const NearyouSearchCard: React.FC<{ store: StoreType }> = ({
  store,
}): JSX.Element => {
  const [showText, setShowText] = useState<boolean>(false);
  const [resize, setResize] = useState<number>(window.innerWidth);
  const textLenght = 40;
  const sliceText = store.address.slice(0, textLenght);
  const navigate = useNavigate()
  useEffect(() => {
    const resizeFunc = () => {
      setResize(window.innerWidth);
    };
    window.addEventListener("resize", resizeFunc);

    return () => window.removeEventListener("resize", resizeFunc);
  }, []);


  const distance_in_km = Math.ceil(
    store.store_distance * 1.609344 + store.store_distance * 1.609344 * 0.5
  );

  return (
    <div
      onClick={() => {
        window.location.href = `https://maps.google.com/?q=${store.store_name}`;
      }}
      className={`cursor-pointer z-0  bg-secondary h-auto shadow-tertiary flex items-center justify-start flex-col shadow-md rounded-[10px] relative `}
    >
      <div
        className=" cursor-pointer md:text-[13px] text-[10px] h-auto  uppercase py-2 font-['Bebas_Neue'] tracking-[2px] text-center"
      >
        {store.store_name}
      </div>

      <div
      
        className="absolute flex flex-col items-stretch w-full mt-10 space-y-2 bg-transparent cursor-pointer md:mt-16"
      >
        <div className="flex justify-end ">
          <span className="px-2 text-sm bg-secondary ">
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
        className="w-full sm::w-[250px] sm::h-[250px] h-auto cursor-pointer"
      />

      <div

        className={`transition-all cursor-pointer md:flex md:px-0 px-2 container border-b border-[#7b7982] relative xl:h-[25%] lg:h-[30%] md:h-[35%] ${ showText ? 'h-auto' : 'h-[30%]'} pb-4`}
      >
        <span
          className={`cursor-pointer p-4 md:relative md:top-0 md:left-0 absolute top-[-2px] left-[21px]`}
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
      
          className="text-left pt-2 block pr-1 leading-[20px] cursor-pointer"
        >
          <p
       
            className={` text-[.8125rem] pb-1 pt-1 md:text-left text-center cursor-pointer	text-[#bcd2d6]`}
          >
            Find us
          </p>
          <div
          
            className={` text-[#fff] md:text-[12px] text-[10px] font-normal cursor-pointer	`}
          >
            {resize < 768 && store.address.length > textLenght && !showText
              ? sliceText + " . . . "
              : store.address}
               {resize < 768 && store.address.length > textLenght && (
            <button
              className={`cursor-pointer hover:text-blue-300  text-white md:text-[13px] text-[10px] p-1 z-[100]  ${
                showText && "block text w-full mt-2"
              }`}
              onClick={(e:any) => {
                e.stopPropagation();
                setShowText((s: boolean) => !s);
              }}
            >
              {showText ? "Show Less" : "Read more"}
            </button>
          )}
          </div>
         
        </div>
      </div>
      <div
        onClick={(e:any) => {
            e.stopPropagation();
            window.location.href =`tel:${store.contactno}`;
        }}
        className="cursor-pointer flex border-b border-[#7b7982] w-full pb-2"
      >
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
        <div className="block py-2 text-left ">
          <p className="text-[.7125rem] text-[#bcd2d6] pb-1 ">Call us</p>
          <p className="text-[#fff] md:text-[13px] text-[10px] font-normal ">
            {store.contactno}
          </p>
        </div>
      </div>

      <div
        className="flex w-full h-auto pb-2 pr-4 cursor-pointer"
      >
        <span
          className="p-4"
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </span>
        <div
      
          className="block py-1 text-left "
        >
          <p
          
            className="text-[.7125rem] text-[#bcd2d6] pb-1"
          >
            Operating Hours
          </p>
          <div
            className="  md:text-[13px] text-[10px] font-normal  text-[#fff] "
          >
            {store.operatinghours.split("</br>")[1] !== undefined
              ? store.operatinghours.split("</br>")[0] +
                " , " +
                store.operatinghours.split("</br>")[1]
              : store.operatinghours.split("</br>")[0]}
          </div>
        </div>
      </div>
    </div>
  );
};
