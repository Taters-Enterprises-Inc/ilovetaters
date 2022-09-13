import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

export function Catering() {
  return (
    <>
      <Helmet>
        <title>Taters | Catering</title>
      </Helmet>

      <HeaderNav
        activeUrl="CATERING"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-catering-logo.webp",
          alt: "Taters Logo",
          className: "w-[80px] lg:w-[90px]",
        }}
      />

      <Outlet />

      <FooterNav activeUrl="CATERING" />
    </>
  );
}
