import { FooterNav, HomeHeaderNav } from "features/shared";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import React, { useEffect, useState } from "react";
import { FranchisingBranchComponent } from "../component/branch-component";
import { FranchisingContactComponent } from "../component/contact-component";

export function Branches() {
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
    <main className="bg-primary h-auto w-full border-primary border-solid	border">
      <HomeHeaderNav serviceReached={serviceReached} active="BRANCHES" />
      <section className="container px-4" >
    <img className="lg:hidden" src={REACT_APP_UPLOADS_URL + "images/popclub/hero/mobile/popclub.webp"} alt="The best pop corn in town"></img>
            <img className="hidden lg:block" src={REACT_APP_UPLOADS_URL + "images/popclub/hero/desktop/popclub.webp"} alt="The best pop corn in town"></img>
    </section>
      <FranchisingContactComponent />
      <FranchisingBranchComponent />
      <FooterNav activeUrl="BRANCHES" />
    </main>
  );
}
