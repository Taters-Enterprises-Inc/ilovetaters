import { SearchAddress } from "features/shared/presentation/components/inputs/search-address";
import React, { useEffect, useRef, useState } from "react";
import { getStoresAvailable } from "features/shared/presentation/slices/get-stores-available-slice";
import { useAppDispatch } from "features/config/hooks";
import { NearyouSearchStore } from "./near-you-search-store";

export const BranchesNearyouComponent: React.FC = (): JSX.Element => {
  const [address, setAddress] = useState<string>("");
  const [showButton, setShowButton] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  
  const ref = useRef<null | HTMLDivElement>(null);

  
  const scrollToTop = () => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  
  useEffect(() => {
    const scrollDown = () => {
      if (window.pageYOffset > 1700) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", scrollDown);
    return () => window.removeEventListener("scroll", scrollDown);
  }, []);




  return (
    <section  ref={ref} className="container pb-[200px] px-4">
      <h1 className="uppercase text-[1.3rem] text-[#fff] font-['Bebas_Neue'] tracking-[2px]">
        WHICH STORE IS NEAR YOU?
      </h1>
      <div className="flex items-center justify-center mb-3">
        <label className="pure-material-textfield-outlined w-full">
          <SearchAddress
            onPlaceSelected={(place: string) => {
              setAddress(place);
              dispatch(getStoresAvailable({ address: place }));
            }}
          />
          <span>Search Address</span>
        </label>
      </div>

      
      <NearyouSearchStore  />
      {
        showButton && (
            <button
                onClick={scrollToTop}
                className=" bg-tertiary fixed bottom-[84px] left-2/4 z-[100] -translate-x-2/4 w-fit rounded-full	"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 "
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="red"
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
        )
      }
    </section>
  );
};
