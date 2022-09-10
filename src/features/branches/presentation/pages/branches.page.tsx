import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  FooterNav,
  HomeHeaderNav,
} from "features/shared/presentation/components";
import React, { useEffect, useState } from "react";
import { BranchComponent } from "../component/branch-component";
import { ContactComponent } from "../component/contact-component";

export function Branches() {
  return (
    <main className="w-full h-auto pb-24 bg-primary">
      <HomeHeaderNav active="BRANCHES" />
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
      <BranchComponent />

      <FooterNav activeUrl="BRANCHES" />
    </main>
  );
}
