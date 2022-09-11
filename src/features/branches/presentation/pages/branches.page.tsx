import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { BranchComponent } from "../component/branch-component";
import { ContactComponent } from "../component/contact-component";

export function Branches() {
  return (
    <>
      <HeaderNav
        activeUrl="BRANCHES"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-logo.webp",
          alt: "Taters Logo",
          className: "w-[150px] lg:w-[120px]",
        }}
      />
      <ContactComponent />
      <BranchComponent />
      <FooterNav activeUrl="BRANCHES" />
    </>
  );
}
