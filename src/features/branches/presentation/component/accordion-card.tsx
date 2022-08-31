import React, { useEffect, useState } from "react";
import { BranchesStoreModel } from "features/branches/core/domain/branches-store.model";
import { useNavigate  } from "react-router-dom";
export const AccordioCard: React.FC<{
  data: BranchesStoreModel;
  show: boolean;
}> = (props): JSX.Element => {
  const {
    address,
    contactno,
    longitude,
    latitude,
    nameofstore,
    operatinghours,
    store_image,
  } = props.data;

  const [showText, setShowText] = useState<boolean>(false);
  const [resize, setResize] = useState<number>(window.innerWidth);
  const textLenght = 40;
  const sliceText = address.slice(0, textLenght);
  const navigate = useNavigate();
 

  useEffect(() => {
    const resizeFunc = () => {
      setResize(window.innerWidth);
    };
    window.addEventListener("resize", resizeFunc);

    return () => window.removeEventListener("resize", resizeFunc);
  }, []);

  return (
    <div
      onClick={() => {
        window.location.href =`https://www.google.com/maps/search/${nameofstore}/@${latitude},${longitude},15z`;
      
      }}
      className={` transition-all ${
        props.show ? "block" : "hidden"
      }z-0 overflow-hidden shadow-tertiary bg-secondary block  w-full rounded-[10px]  border-gray-200 shadow-md  `}
    >
      <h1 className="font-['Bebas_Neue'] text-center tracking-[1.5px]  antialiased md:text-[1.0625rem] md:text-[13px] text-[10px] text-[#fff] py-2 relative md:px-0 px-4 h-auto flex items-center justify-center">
        {nameofstore}
      </h1>
      <div className="w-full h-auto relative cursor-pointer">
        <img
          className="object-cover	w-[100%] h-[100%] max-h-[300px]  	"
          src={
            store_image
              ? `https://ilovetaters.com/shop/assets/img//store_images/250/${store_image}`
              : "https://ilovetaters.com/shop/assets/img//store_images/250/taters_ayalacircuit.jpg"
          }
          alt="taters_ayalacircuit"
        />
      </div>
      <div
        className={`cursor-pointer md:flex md:px-0 px-4  container border-b border-[#7b7982] xl:h-[105px] lg:h-[130px] ${
          showText ? "h-auto" : "h-[105px]"
        } md:h-[105px] z-10 relative py-2 `}
      >
        <span className="p-4 md:relative  md:left-0  absolute top-0 left-[21px]">
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
          -2 block pr-1 leading-[20px]"
        >
          <p className="text-[.8125rem] text-[#bcd2d6] pb-1 pt-1 md:text-left text-center">
            Find us
          </p>
          <div className="text-[#fff] md:text-[13px] text-[10px] font-normal 	">
            {resize < 768 && address.length > textLenght && !showText
              ? sliceText + " . . . "
              : address}
            {resize < 768 && address.length > textLenght && (
              <button
                className={`cursor-pointer hover:text-blue-300  text-white md:text-[13px] text-[10px] p-1 z-[100]  ${
                  showText && "block text w-full mt-2"
                }`}
                onClick={(e: any) => {
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
        className="cursor-pointer flex  border-b border-[#7b7982]"
        onClick={(e: any) => {
          e.stopPropagation();
          window.location.href =`tel:${contactno}`;
        }}
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
        <div className="block text-left py-2 ">
          <p className="text-[.7125rem] text-[#bcd2d6] pb-1 ">Call us</p>
          <p className="text-[#fff] md:text-[13px] text-[10px] font-normal ">
            {contactno}
          </p>
        </div>
      </div>
      <div className="flex  md:h-[85px] h-auto py-2 pr-4">
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
          <p className="text-[.7125rem] text-[#bcd2d6] pb-1">Operating Hours</p>
          <div className="md:text-[12px] md:text-[13px] text-[10px] font-normal  text-[#fff] ">
            <p>
              {operatinghours.split("</br>")[1] !== undefined
                ? operatinghours.split("</br>")[0] +
                  " , " +
                  operatinghours.split("</br>")[1]
                : operatinghours.split("</br>")[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
