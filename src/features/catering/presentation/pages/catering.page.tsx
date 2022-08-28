import { FooterNav, HeaderNav } from "features/shared";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { Outlet } from "react-router-dom";

export function Catering() {
  return (
    <main className="bg-primary min-h-screen">
      <HeaderNav
        activeUrl="CATERING"
        logoProps={{
          src:
            REACT_APP_UPLOADS_URL +
            "images/shared/logo/taters-catering-logo.webp",
          alt: "Taters Logo",
          className: "w-[80px] lg:w-[140px]",
        }}
      />

      <Outlet />

      <FooterNav activeUrl="CATERING" />
    </main>
  );
}
