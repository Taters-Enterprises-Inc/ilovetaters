import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FooterNav,
  HeaderNav,
  UnExpiredRedeem,
} from "features/shared/presentation/components";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getLatestUnexpiredRedeem,
  selectGetLatestUnexpiredRedeem,
} from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";

import { useEffect } from "react";

export function Shop() {
  const dispatch = useAppDispatch();

  const getLatestUnexpiredRedeemState = useAppSelector(
    selectGetLatestUnexpiredRedeem
  );

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
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-snackshop-logo.webp",
          alt: "Taters Logo",
          className: "w-[90px] lg:w-[100px]",
        }}
      />

      <Outlet />

      <FooterNav activeUrl="SNACKSHOP" />
    </>
  );
}
