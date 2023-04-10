import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useAppDispatch } from "features/config/hooks";
import { getLatestUnexpiredRedeem } from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";

import { useEffect } from "react";
import { ShopMaintenance } from "../components";

export function Shop() {
  const maintenance = false;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLatestUnexpiredRedeem());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Taters | Snackshop</title>
      </Helmet>

      <HeaderNav
        activeUrl="SNACKSHOP"
        homePageUrl="/delivery"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-snackshop-logo.png",
          alt: "Taters Logo",
          className: "w-[90px] lg:w-[100px]",
        }}
      />

      {maintenance ? <ShopMaintenance /> : <Outlet />}

      <FooterNav activeUrl="SNACKSHOP" />
    </>
  );
}
