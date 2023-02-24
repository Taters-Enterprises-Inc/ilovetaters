import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export function Profile() {
  return (
    <>
      <Helmet>
        <title>Taters | Snackshop</title>
      </Helmet>

      <HeaderNav
        activeUrl="PROFILE"
        homePageUrl="/profile"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-logo.png",
          alt: "Taters Logo",
          className: "w-[90px] lg:w-[100px]",
        }}
      />

      <Outlet />

      <FooterNav activeUrl="PROFILE" />
    </>
  );
}
