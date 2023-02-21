import { useAppDispatch } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import CustomizedAccordions from "../components/faqs";

export function Franchising() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(storeReset());
  }, [dispatch]);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return (
    <main className="bg-primary">
      <HeaderNav
        activeUrl="FRANCHISING"
        homePageUrl="/franchising"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-logo.png",
          alt: "Taters Logo",
          className: "w-[150px] lg:w-[120px]",
        }}
      />

      <div className="relative">
        <img
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/franchising/hero/desktop/franchising-black.jpg"
          }
          alt="The best pop corn in town"
          className="hidden object-contain object-center w-full lg:block"
        />
        <img
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/franchising/hero/mobile/franchising-black.jpg"
          }
          alt="The best pop corn in town"
          className="block object-contain object-center w-full lg:hidden"
        />
        <div className="absolute top-0 w-full h-full ">
          <div className="container flex flex-col h-full mx-auto lg:flex-row">
            <div className="lg:flex-1"></div>
            <div className="flex items-center justify-end flex-1">
              <iframe
                className="lg:w-[90%] lg:h-[75%] w-[100%] h-[40%] lg:px-0 px-4"
                src="https://www.youtube.com/embed/dvAGdCU6TTY"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <section className="container min-h-min">
        <section className="container px-4 pt-6 lg:px-0 md:px-8:"></section>

        <h1 className='text-tertiary text-3xl font-["Bebas_Neue"] text-center py-6 '>
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <CustomizedAccordions></CustomizedAccordions>
      </section>

      <section className="pt-6 pb-32 text-left lg:pb-16 lg:px-0 md:px-8 bg-primary">
        <div className="container mb-6 text-white">
          <h1 className="text-3xl text-center font-bold leading-[2.3rem] font-['Bebas_Neue'] tracking-wide ">
            Ready to invest in the best Snacks in Town?
          </h1>
          <br />
          <p className="pb-2 text-lg text-center">
            Kindly fill up our franchise application form and submit a letter of
            intent specifying your intended space and franchise location. Send
            your applications thru <strong>franchising@tatersgroup.com</strong>.
          </p>

          <div className="flex flex-col justify-center mt-6 space-y-2 sm:space-x-2 sm:space-y-0 sm:flex-row">
            <a
              href={require("assets/FranchiseApplicationForm.pdf")}
              download
              className="bg-white text-sm text-black w-full sm:w-[150px] rounded-full font-bold h-[35px] flex justify-center items-center"
            >
              Application Form
            </a>
            <a
              href={require("assets/TatersFranchiseKit.pdf")}
              download
              className="bg-white text-sm text-black w-full sm:w-[150px] rounded-full font-bold h-[35px] flex justify-center items-center"
            >
              Franchise Kit
            </a>
          </div>
        </div>
      </section>

      <FooterNav activeUrl="HOME" />
    </main>
  );
}
