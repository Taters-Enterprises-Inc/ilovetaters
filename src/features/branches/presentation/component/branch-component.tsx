import React, { useEffect, useRef, useState } from "react";
import { AccordionComponent } from "./accordion-branch-component";
import { BranchesNearyouComponent } from "./branches-near-you-component";

export const FranchisingBranchComponent: React.FC = (): JSX.Element => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [catigory, setCatigory] = useState<boolean>(false);
  
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



  

  
  return (
    <section className="bg-primary ">
      <section ref={ref} className="block  antialiased font-['Bebas_Neue']">
        <h1 className=" md:text-[3rem] text-[2rem] font-normal text-center container my-4 text-[#f2f1ed] tracking-[2px]">
          Our Branches
        </h1>
      </section>
      <section className="container mx-auto grid grid-cols-2 gap-x-4 justify-center items-center mb-4 h-auto font-['Bebas_Neue'] ">
        <div className="flex justify-end">
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
        </div>
        <div>
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
        </div>
      </section>

      {catigory ? (
       <BranchesNearyouComponent />
      ) : (
        <>
          <section className="  mb-20 z-1  mb-[100px] lg:grid lg:grid-cols-2 lg:gap-x-4  md:block container mx-auto h-auto  md:pb-0 pb-10	 px-4 ">

            {['ncr' , 'luzon' ,'visayas' ,'mindanao'].map(
              (data:string, idx: number): JSX.Element => {
                return (
                  <AccordionComponent
                    key={idx}
                    region={data}
                  />
                );
              }
            )}
            {showButton && (
              <button
                onClick={scrollToTop}
                className="shadow-none bg-tertiary fixed bottom-[84px] left-2/4 z-[100] -translate-x-2/4 w-fit rounded-full	"
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
