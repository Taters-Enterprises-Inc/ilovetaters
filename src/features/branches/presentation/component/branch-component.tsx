import React  from "react";
import { AccordionComponent } from "./accordion-branch-component";
import { BranchesNearyouComponent } from "./branches-near-you-component";
import { useLocation  } from "react-router-dom";
export const FranchisingBranchComponent: React.FC = (): JSX.Element => {
  const location = useLocation()
  
  return (
    <section className="bg-primary ">
      <section className="block  antialiased font-['Bebas_Neue']">
        <h1 className=" md:text-[3rem] text-[2rem] font-normal text-center container my-4 text-[#f2f1ed] tracking-[2px]">
          Our Branches
        </h1>
      </section>
      <section className="container mx-auto grid grid-cols-2 gap-x-4 justify-center items-center mb-4 h-auto font-['Bebas_Neue'] ">
        <div className="flex justify-end">
          <button
            onClick={() => {
              window.location.href = '/branches'
            }}
            className={`${
              location.pathname !== "/near-you"
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
              window.location.href = '/near-you'
            }}
            className={`${
              location.pathname === "/near-you"
                ? "bg-tertiary text-secondary "
                : "bg-transparent  text-white border-solid border-2 border-tertiary"
            }   py-2 px-4  rounded-[10px] tracking-[1px]`}
          >
            Near you ?
          </button>
        </div>
      </section>

      {location.pathname === "/near-you" ? (
        <BranchesNearyouComponent />
      ) : (
        <>
          <section className=" z-1  mb-[100px] lg:grid lg:grid-cols-2 lg:gap-x-4  md:block container mx-auto h-auto  md:pb-0 pb-10	 px-4 ">
            {["ncr", "luzon", "visayas", "mindanao"].map(
              (data: string, idx: number): JSX.Element => {
                return (
                  <AccordionComponent
                    key={idx}
                    region={data}
                  />
                );
              }
            )}
          </section>
        </>
      )}
    </section>
  );
};
