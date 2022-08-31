import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

export function PopClub() {
  return (
    <main className="min-h-screen bg-primary">
      <Helmet>
        <title>Taters | PopClub</title>
      </Helmet>

      <HeaderNav
        activeUrl="POPCLUB"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-logo.webp",
          alt: "Taters Logo",
          className: "w-[100px] lg:w-[160px]",
        }}
      />

      <Outlet />

      <FooterNav activeUrl="POPCLUB" />
    </main>
  );
}
