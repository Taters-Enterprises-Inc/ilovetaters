import {
  FooterNav,
  HomeHeaderNav,
} from "features/shared/presentation/components";
import { useEffect, useRef, useState } from "react";
import {
  REACT_APP_UPLOADS_URL,
  SERVICES_DESKTOP,
  SERVICES_MOBILE,
} from "features/shared/constants";

export function Home() {
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
      <HomeHeaderNav serviceReached={serviceReached} active="HOME" />

      <section
        style={{
          backgroundImage: `url('${REACT_APP_UPLOADS_URL}images/home/hero/mobile/taters_entertainment_snacks.webp')`,
          backgroundSize: "contain",
          backgroundPositionX: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="relative items-end justify-center sm:hidden "
      >
        <img
          src={
            REACT_APP_UPLOADS_URL +
            "images/home/hero/mobile/taters_entertainment_snacks.webp"
          }
          alt="The best pop corn in town"
          style={{ visibility: "hidden" }}
        ></img>
      </section>

      <section
        style={{
          backgroundImage: `url('${REACT_APP_UPLOADS_URL}images/home/hero/desktop/taters_entertainment_snacks.webp')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="relative items-end justify-center hidden sm:flex "
      >
        <img
          src={
            REACT_APP_UPLOADS_URL +
            "images/home/hero/desktop/taters_entertainment_snacks.webp"
          }
          alt="The best pop corn in town"
          style={{ visibility: "hidden" }}
        ></img>
      </section>

      <section
        ref={servicesRef}
        className="container hidden pb-[100px] grid-cols-3 gap-4 pt-4 sm:grid"
      >
        {SERVICES_DESKTOP.map(function (service_desktop, i) {
          return (
            <div key={i}>
              <div className=" h-[250px] sm:h-[300px] text-white">
                <a href={service_desktop.url} key={i}>
                  <div
                    style={{
                      backgroundImage: `url("${
                        REACT_APP_UPLOADS_URL + service_desktop.image
                      }")`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      position: "relative",
                    }}
                    className=" h-full flex items-end bg-gray-400 cursor-pointer rounded-[1rem] lg:rounded-[1rem] shadow-md shadow-[#ffcd17]"
                  >
                    <div
                      className="w-full px-6 pt-14 pb-3 rounded-b-[1rem] lg:rounded-b-[1rem]"
                      style={{
                        background: `linear-gradient(transparent 0%, ${service_desktop.color} 45%, ${service_desktop.color} 100%)`,
                        lineHeight: "14px",
                        color: service_desktop.textColor,
                      }}
                    >
                      <h4 className="text-[16px] sm:text-lg lg:text-2xl font-['Bebas_Neue'] ">
                        {service_desktop.title}
                      </h4>
                      <p className="text-[9px] sm:text-xs lg:text-xs">
                        {service_desktop.subtitle}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </section>

      <section
        ref={servicesRef}
        className="container grid grid-cols-2 gap-4 pt-4 sm:hidden pb-[90px]"
      >
        {SERVICES_MOBILE.map(function (service_mobile, i) {
          return (
            <div key={i}>
              <div key={i} className="h-[250px] sm:h-[300px] text-white">
                <a href={service_mobile.url}>
                  <div
                    style={{
                      backgroundImage: `url("${
                        REACT_APP_UPLOADS_URL + service_mobile.image
                      }")`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      position: "relative",
                    }}
                    className="shadow-md shadow-[#ffcd17] h-full flex items-end bg-gray-400 cursor-pointer rounded-[0.5rem] lg:rounded-[2rem]"
                  >
                    <div
                      className="w-full lg:px-6 px-2 pt-14 pb-3 rounded-b-[0.5rem] lg:rounded-b-[2rem] "
                      style={{
                        background: `linear-gradient(transparent 0%, ${service_mobile.color} 45%, ${service_mobile.color} 100%)`,
                        lineHeight: "14px",
                        color: service_mobile.textColor,
                      }}
                    >
                      <h4 className="text-[20px] sm:text-lg lg:text-2xl font-['Bebas_Neue'] tracking-[1px]">
                        {service_mobile.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs lg:text-xs font-semibold">
                        {service_mobile.subtitle}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </section>

      <FooterNav activeUrl="HOME"></FooterNav>
    </main>
  );
}
