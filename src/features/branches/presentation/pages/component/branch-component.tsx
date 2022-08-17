import React, { useEffect, useRef, useState } from "react";
import { branches, branchesTypes } from "../data/branches-data";
import { AccordionComponent } from "./accordion-branch-component";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StoreListDelivery } from "features/shop/presentation/components/store-list-delivery";
import { getStoresAvailable } from "features/shared/presentation/slices/get-stores-available-slice";
import { SearchAddress } from "features/shared/presentation/components/inputs/search-address";


export const FranchisingBranchComponent: React.FC = (): JSX.Element => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [catigory, setCatigory] = useState<boolean>(false);
  const [address, setAddress] = useState<any>("");
  const getSessionState = useAppSelector(selectGetSession);
  const dispatch = useAppDispatch();

  const ref = useRef<null | HTMLTableSectionElement>(null);

  const scrollToTop = () => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const scrollDown = () => {
      if (window.pageYOffset > 1300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", scrollDown);
    return () => window.removeEventListener("scroll", scrollDown);
  }, []);

  useEffect(() => {
    dispatch(getSession());
  }, []);

  useEffect(() => {
    if (getSessionState.data?.customer_address !== null) {
      setAddress(getSessionState.data?.customer_address);
    }
  }, []);
  console.log(address);
  return (
    <section className="bg-primary">
      <section ref={ref} className="block  antialiased font-['Bebas_Neue']">
        <h1 className=" md:text-[3rem] text-[2rem] font-normal text-center container my-4 text-[#f2f1ed] tracking-[2px]">
          Our Branches
        </h1>
      </section>
      <section className="container flex space-x-4 justify-center items-center mb-4 h-auto font-['Bebas_Neue'] ">
        <button
          onClick={() => {
            setCatigory(false);
          }}
          className={`${
            !catigory
              ? "bg-tertiary text-secondary "
              : "bg-transparent  text-white border-solid border-2 border-tertiary"
          }   py-2 px-4  rounded-[10px] tracking-[1px]`}
        >
          Region
        </button>

        <button
          onClick={() => {
            setCatigory(true);
          }}
          className={`${
            catigory
              ? "bg-tertiary text-secondary "
              : "bg-transparent  text-white border-solid border-2 border-tertiary"
          }   py-2 px-4  rounded-[10px] tracking-[1px]`}
        >
          Near you ?
        </button>
      </section>

      {catigory ? (
        <section className="container pb-[200px]">
          <h1 className="uppercase text-[1.3rem] text-[#fff] font-['Bebas_Neue'] tracking-[2px]">
            WHICH STORE IS NEAR YOU?
          </h1>
          <SearchAddress
            onPlaceSelected={(place: string) => {
              setAddress(place);
              dispatch(getStoresAvailable({ address: place }));
            }}
          />
          <StoreListDelivery address={address} />
        </section>
      ) : (
        <>
          <section className="z-1  pb-[200px] lg:grid lg:grid-cols-2 lg:gap-x- md:block container h-auto  md:pb-0">
            {branches.map(
              ({ region, branch }: branchesTypes, idx: number): JSX.Element => {
                return (
                  <AccordionComponent
                    key={idx}
                    region={region}
                    branch={branch}
                    idx={idx}
                  />
                );
              }
            )}
            {showButton && (
              <button
                onClick={scrollToTop}
                className=" bg-tertiary fixed bottom-[84px] left-2/4 z-100 -translate-x-2/4 w-fit rounded-full	"
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
            )}
          </section>
        </>
      )}
    </section>
  );
};
