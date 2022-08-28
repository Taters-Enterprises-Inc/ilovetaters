import { FooterNav } from "features/shared";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { HeaderNav } from "../../../shared/presentation/components/header/header-nav";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

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
            REACT_APP_UPLOADS_URL +
            "images/shared/logo/taters-snackshop-logo.webp",
          alt: "Taters Logo",
          className: "w-[100px] lg:w-[160px]",
        }}
      />

      <Outlet />

      <FooterNav activeUrl="SNACKSHOP" />
    </main>
  );
}
