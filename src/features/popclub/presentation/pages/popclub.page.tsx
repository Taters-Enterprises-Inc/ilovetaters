import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { PopclubMaintenance } from "../components";

export function PopClub() {
  const maintenance = false;

  return (
    <main className="min-h-screen bg-primary">
      <Helmet>
        <title>Taters | PopClub</title>
      </Helmet>

      <HeaderNav
        activeUrl="POPCLUB"
        homePageUrl="/popclub"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-logo.png",
          alt: "Taters Logo",
          className: "w-[100px] lg:w-[140px]",
        }}
      />

      {maintenance ? <PopclubMaintenance /> : <Outlet />}

      <FooterNav activeUrl="POPCLUB" />
    </main>
  );
}
