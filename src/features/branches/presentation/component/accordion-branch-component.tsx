import { useEffect, useState } from "react";
import {
  getBranchesStore,
  selectGetBranchesStore,
} from "../slices/get-branches-store";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { BranchesStoreModel } from "features/branches/core/domain/branches-store.model";
export const AccordionComponent: React.FC<{
  region: string;
  seeItShow: any;
}> = ({ region, seeItShow }): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const getBranchesStoreState: any = useAppSelector(selectGetBranchesStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBranchesStore());
  }, [dispatch]);

  console.log(getBranchesStoreState);
  return (
    <div className={`relative  `}>
      <div
        className={`
          cursor-pointer flex ${
            !show ? "mb-4" : ""
          } transition-all py-2 border items-center font rounded cursor-pointer px-4	  
        `}
        onClick={() => {
          seeItShow(!show);
          setShow((isShow: boolean) => !isShow);
        }}
      >
        <h1 className="text-left flex-1 text-[#fff] tracking-[2px] font-['Bebas_Neue'] ">
          {region}
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-8 w-8  transition-all  ${
            show ? "rotate-0" : "rotate-180"
          } `}
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {show && (
        <div
          className={`w-f ${
            show ? "h-auto bg-primary " : "h-0"
          } grid lg:grid lg:grid-cols-2  md:w-full transition-all duration-1000 gap-x-4 gap-y-4 grid-cols-2 py-4 rounded-lg w-full  `}
        >
          {getBranchesStoreState?.data?.[`${region}`].map(
            (
              {
                nameofstore,
                address,
                contactno,
                store_image,
                operatinghours,
                latitude,
                longitude,
              }: BranchesStoreModel,
              index: number
            ): JSX.Element => {
              return (
                <div
                  key={index}
                  className={` transition-all ${
                    show ? "block" : "hidden"
                  }z-0 overflow-hidden shadow-tertiary bg-secondary block  w-full rounded-[10px]  border-gray-200 shadow-md  `}
                >
                  <h1 className="font-['Bebas_Neue'] text-center tracking-[1.5px] pt-2 antialiased md:text-[1.0625rem] text-[13px] text-[#fff] pb-2 relative md:px-0 px-2 h-[60px] flex items-center justify-center">
                    {nameofstore}
                  </h1>
                  <div className="w-full h-auto relative">
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
                    style={{
                      background:
                        "linear-gradient( 0%, rgb(29, 17, 21) 45%, rgb(29, 17, 21) 100%)",
                      boxShadow: " 0px -39px 25px 13px rgba(0,0,0,0.75)",
                    }}
                    className="z-0 cursor-pointer md:flex md:px-0 px-2  container border-b border-[#7b7982] xl:h-[105px] lg:h-[130px]  h-[150px] md:h-[105px] 	z-10 relative py-2"
                  >
                    <span className="p-4 md:relative md:top-0 md:left-0  absolute top-[-12px] left-[21px]">
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
                      <p className="text-[.8125rem] text-[#bcd2d6] pb-1 pt-1 md:text-left text-center">
                        Find us
                      </p>
                      <a
                        className="text-[#fff] md:text-[12px] text-[11.9px] font-normal 	"
                        href={`https://www.google.com/maps/search/${nameofstore}/@${latitude},${longitude},15z`}
                      >
                        {address}
                      </a>
                    </div>
                  </div>
                  <div className="cursor-pointer flex  border-b border-[#7b7982]">
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
                        href={`/tel:${contactno}`}
                      >
                        {contactno}
                      </a>
                    </div>
                  </div>
                  <div className="flex  md:h-[85px] h-auto py-2">
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
            }
          )}
        </div>
      )}
    </div>
  );
};
