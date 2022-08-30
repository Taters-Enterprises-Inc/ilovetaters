import { FooterNav, HomeHeaderNav } from "features/shared";
import { useEffect, useRef, useState } from "react";
import CustomizedAccordions from "../components/faqs";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";

export function Franchising() {
  const [serviceReached, setServiceReached] = useState(false);
  const servicesRef = useRef<any>(null);

  const listenScrollEvent = (event: any) => {
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
    <main className="bg-primary">
      <HomeHeaderNav
        serviceReached={serviceReached}
        active="FRANCHISING"
      ></HomeHeaderNav>
      <img
        className="lg:hidden"
        src={REACT_APP_UPLOADS_URL + "images/popclub/hero/mobile/popclub.webp"}
        alt="The best pop corn in town"
      ></img>
      <img
        className="hidden lg:block"
        src={REACT_APP_UPLOADS_URL + "images/popclub/hero/desktop/popclub.webp"}
        alt="The best pop corn in town"
      ></img>

      <section ref={servicesRef} className="container min-h-min">
        <section className="container lg:px-0 md:px-8 px-4 pt-6"></section>

        <h1 className='text-tertiary text-3xl font-["Bebas_Neue"] text-center pb-6 '>
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <CustomizedAccordions></CustomizedAccordions>
      </section>

      {/* <img src="..../assets/top.jpeg" alt='Taters Top Bottom Banner' className="w-full lg:hidden"/>
            <img src="..../assets/top.jpeg" alt='Taters Top Bottom Banner' className="w-full hidden lg:block"/> */}

      <section className="text-left lg:px-0 md:px-8 pt-6 pb-16 bg-primary">
        <div className="container text-white mb-6">
          <h1 className="text-3xl text-center font-bold leading-[2.3rem] font-['Bebas_Neue'] tracking-wide ">
            Ready to invest in the best Snacks in Town?
          </h1>
          <br />
          <p className="text-lg">
            Kindly fill up our franchise application form and submit a letter of
            intent specifying your intended space and franchise location. Send
            your applications thru <strong>franchising@tatersgroup.com</strong>.
          </p>

          <div className="sm:space-x-2 sm:space-y-0 space-y-2 flex flex-col sm:flex-row mt-6 justify-center">
            <a
              href="FranchiseApplicationForm.pdf"
              download="FranchiseApplicationForm.pdf"
              className="bg-white text-sm text-black w-full sm:w-[150px] rounded-full font-bold h-[35px] flex justify-center items-center"
            >
              Application Form
            </a>
            <a
              href="TatersFranchiseKit.pdf"
              download="TatersFranchiseKit.pdf"
              className="bg-white text-sm text-black w-full sm:w-[150px] rounded-full font-bold h-[35px] flex justify-center items-center"
            >
              Franchise Kit
            </a>
          </div>
        </div>
      </section>

      {/* <img src="top.jpeg" alt='Taters Top Bottom Banner' className="w-full lg:hidden"/>
      <img src="top.jpeg" alt='Taters Top Bottom Banner' className="w-full hidden lg:block"/> */}
      <FooterNav activeUrl="HOME" />
    </main>
  );
}
