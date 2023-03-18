import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { CateringMaintenance } from "../components";

export function Catering() {
  const maintenance = false;
  return (
    <>
      <Helmet>
        <title>Taters | Catering</title>
      </Helmet>
      <HeaderNav
        activeUrl="CATERING"
        homePageUrl="/shop"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-catering-logo.png",
          alt: "Taters Logo",
          className: "w-[80px] lg:w-[90px]",
        }}
      />

      {maintenance ? <CateringMaintenance /> : <Outlet />}

      <FooterNav activeUrl="CATERING" />
    </>
  );
}
