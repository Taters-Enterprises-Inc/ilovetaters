import { FooterNav, HeaderNav } from "features/shared";
import React, { useEffect, useState } from "react";
import { FranchisingBranchComponent } from "./component/branch-component";
import { FranchisingContactComponent } from "./component/contact-component";

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
    <main className="bg-primary min-h-screen w-full max-h-max	">
      <HeaderNav serviceReached={serviceReached} active="BRANCHES" />
      <section className="w-full h-auto relative lg:block hidden">
        <div className="w-full h-20 pt-14 shadow-lg"></div>
      </section>
      <FranchisingContactComponent />
      <FranchisingBranchComponent />
      <FooterNav />
    </main>
  );
}
