import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export function Shop() {
  return (
    <main className="min-h-screen bg-primary">
      <Helmet>
        <title>Taters | Snackshop</title>
      </Helmet>

      <HeaderNav
        activeUrl="SNACKSHOP"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-snackshop-logo.webp",
          alt: "Taters Logo",
          className: "w-[100px] lg:w-[160px]",
        }}
      />

      <Outlet />

      <FooterNav activeUrl="SNACKSHOP" />
    </main>
  );
}
