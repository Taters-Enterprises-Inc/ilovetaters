import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";

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
