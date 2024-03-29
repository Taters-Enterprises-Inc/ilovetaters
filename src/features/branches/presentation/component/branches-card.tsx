import React, { useEffect, useState } from "react";

import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { StoreModel } from "features/shared/core/domain/store.model";
import moment from "moment";
import { MdOutlineFiberNew } from "react-icons/md";
import { TiStarburst } from "react-icons/ti";

interface BranchesCardProps {
  store: StoreModel;
}

export function BranchesCard(props: BranchesCardProps) {
  const [showText, setShowText] = useState<boolean>(false);
  const [resize, setResize] = useState<number>(window.innerWidth);
  const sliceText = props.store.address.slice(0, 40);
  const dateadded = moment(props.store.dateadded);
  const currentDate = moment();

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
        window.location.href = `https://maps.google.com/?q=${props.store.store_name}`;
      }}
      className={`cursor-pointer z-0  bg-secondary h-auto shadow-tertiary flex items-center justify-start flex-col shadow-md rounded-[10px] relative `}
    >
      <div className="flex">
        <div className="flex-1 cursor-pointer md:text-[13px] text-[10px] h-auto  uppercase py-2 font-['Bebas_Neue'] tracking-[2px] text-center">
          {props.store.store_name}
        </div>

        {props.store.dateadded &&
        dateadded.isAfter(currentDate.subtract(3, "months")) ? (
          <div className="flex w-5">
            <TiStarburst className="absolute right-[-17px] top-[-12px] text-tertiary text-6xl" />
            <MdOutlineFiberNew className="absolute right-[2.5px] top-[3px] text-red-600 text-4xl right-[-5px] top-[0px]" />
          </div>
        ) : null}
      </div>
      <img
        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/store_images/250/${props.store.store_image}`}
        alt=""
        className="w-full sm::w-[250px] sm::h-[250px] h-auto cursor-pointer"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
        }}
      />
      <div
        className={`transition-all cursor-pointer flex border-b border-[#7b7982] w-full pb-2`}
      >
        <span className={`p-4`}>
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
        <div className="text-left py-2 block leading-[20px] cursor-pointer">
          <p className={`text-[.8125rem] cursor-pointer	text-[#bcd2d6] pb-1`}>
            Find us
          </p>
          <div
            className={` text-[#fff] md:text-[12px] text-[10px] font-normal cursor-pointer pr-2.5`}
          >
            {resize < 768 && props.store.address.length > 40 && !showText
              ? sliceText + " . . . "
              : props.store.address}
            {resize < 768 && props.store.address.length > 40 && (
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
        onClick={(e: any) => {
          e.stopPropagation();
          window.location.href = `tel:${props.store.contactno}`;
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
            {props.store.contactno}
          </p>
        </div>
      </div>

      <div className="flex w-full h-auto pb-2 pr-4 cursor-pointer">
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
        <div className="block py-2 text-left">
          <p className="text-[.7125rem] text-[#bcd2d6] pb-1">Operating Hours</p>
          <div className="  md:text-[13px] text-[10px] font-normal  text-[#fff] ">
            {moment(props.store.available_start_time, "HH:mm:ss").format("LT")}{" "}
            - {moment(props.store.available_end_time, "HH:mm:ss").format("LT")}
          </div>
        </div>
      </div>
    </div>
  );
}
