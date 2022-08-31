import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  FooterNav,
  HomeHeaderNav,
} from "features/shared/presentation/components";
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
      <FranchisingContactComponent />
      <FranchisingBranchComponent />
      <FooterNav activeUrl="BRANCHES" />
    </main>
  );
}
