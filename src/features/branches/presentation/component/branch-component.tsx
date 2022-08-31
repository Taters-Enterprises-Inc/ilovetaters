import React from "react";
import { AccordionComponent } from "./accordion-branch-component";
import { useNavigate } from "react-router-dom";
export const BranchComponent: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

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
              navigate("/branches");
            }}
            className=" bg-tertiary text-secondary py-2 px-4  rounded-[10px] tracking-[1px]"
          >
            Region
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/near-you");
            }}
            className="bg-transparent  text-white border-solid border-2 border-tertiary py-2 px-4  rounded-[10px] tracking-[1px]"
          >
            Near you ?
          </button>
        </div>
      </section>
      {/* Deleted the 100px margin on bottom*/}
      <section className="container h-auto px-4 pb-10 mx-auto  z-1 lg:grid lg:grid-cols-2 lg:gap-x-4 md:block md:pb-0">
        {["ncr", "luzon", "visayas", "mindanao"].map(
          (data: string, idx: number): JSX.Element => {
            return <AccordionComponent key={idx} region={data} />;
          }
        )}
      </section>
    </section>
  );
};
