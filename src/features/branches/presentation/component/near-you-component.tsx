import React, { useEffect, useState }  from "react";
import { BranchesNearyouComponent } from "./branches-near-you-component";
import { useNavigate } from "react-router-dom";
import { ContactComponent } from "./contact-component";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FooterNav, HomeHeaderNav } from "features/shared/presentation/components";



export const NearyouComponent:React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  

  const [serviceReached, setServiceReached] = useState<boolean>(false);

  const listenScrollEvent = () => {
    if (window.scrollY < 203) {
      return setServiceReached(false);
    } else if (window.scrollY > 200) {
      return setServiceReached(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  
  return (
    <main className="w-full h-auto border border-solid bg-primary border-primary">
    <HomeHeaderNav serviceReached={serviceReached} active="BRANCHES" />
    <img
      className="lg:hidden"
      src={
        REACT_APP_DOMAIN_URL +
        "api/assets/images/branches/hero/mobile/branches_nationwide.webp"
      }
      alt="The best pop corn in town"
    ></img>
    <img
      className="hidden lg:block"
      src={
        REACT_APP_DOMAIN_URL +
        "api/assets/images/branches/hero/desktop/branches_nationwide.webp"
      }
      alt="The best pop corn in town"
    ></img>
    <ContactComponent />
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
                navigate('/branches')
            }}
            className= "bg-transparent  text-white border-solid border-2 border-tertiary py-2 px-4  rounded-[10px] tracking-[1px]"
          >
            Region
          </button>
        </div>
        <div>
          <button
            onClick={() => {
                navigate('/near-you')
            }}
            className="bg-tertiary text-secondary py-2 px-4  rounded-[10px] tracking-[1px]"
          >
            Near you ?
          </button>
        </div>
      </section>
        <BranchesNearyouComponent />
    </section>
    <FooterNav activeUrl="BRANCHES" />
  </main>
   
  );
};
