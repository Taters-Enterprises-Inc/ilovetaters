import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  FooterNav,
  HomeHeaderNav,
} from "features/shared/presentation/components";
import { useEffect, useRef, useState } from "react";
import CustomizedAccordions from "../components/faqs";

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

      <div className="lg:hidden mobcontainer">
        <iframe
          className="responsive"
          src="https://www.youtube.com/embed/dvAGdCU6TTY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <img
        className="lg:hidden"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/popclub/hero/mobile/popclub.webp"
        }
        alt="The best pop corn in town"
      ></img>

      <div className="vid-container m-auto hidden lg:block pt-16">
        <iframe
          className="m-auto"
          width="1160"
          height="650"
          src="https://www.youtube.com/embed/dvAGdCU6TTY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <img
        className="m-auto hidden lg:block pt-5"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/popclub/hero/desktop/popclub.webp"
        }
        alt="The best pop corn in town"
      ></img>

      <section ref={servicesRef} className="container min-h-min">
        <section className="container px-4 pt-6 lg:px-0 md:px-8:"></section>

        <h1 className='text-tertiary text-3xl font-["Bebas_Neue"] text-center py-6 '>
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <CustomizedAccordions></CustomizedAccordions>
      </section>

      {/* <img src="..../assets/top.jpeg" alt='Taters Top Bottom Banner' className="w-full lg:hidden"/>
            <img src="..../assets/top.jpeg" alt='Taters Top Bottom Banner' className="hidden w-full lg:block"/> */}

      <section className="pt-6 pb-32 text-left lg:pb-16 lg:px-0 md:px-8 bg-primary">
        <div className="container mb-6 text-white">
          <h1 className="text-3xl text-center font-bold leading-[2.3rem] font-['Bebas_Neue'] tracking-wide ">
            Ready to invest in the best Snacks in Town?
          </h1>
          <br />
          <p className="text-lg">
            Kindly fill up our franchise application form and submit a letter of
            intent specifying your intended space and franchise location. Send
            your applications thru <strong>franchising@tatersgroup.com</strong>.
          </p>

          <div className="flex flex-col justify-center mt-6 space-y-2 sm:space-x-2 sm:space-y-0 sm:flex-row">
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
      <img src="top.jpeg" alt='Taters Top Bottom Banner' className="hidden w-full lg:block"/> */}
      <FooterNav activeUrl="HOME" />
    </main>
  );
}
