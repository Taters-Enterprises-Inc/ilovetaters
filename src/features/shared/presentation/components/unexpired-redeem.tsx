import { Link, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getLatestUnexpiredRedeem,
  selectGetLatestUnexpiredRedeem,
} from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";

import { useEffect } from "react";
import { CountdownTimerLatestRedeem } from "features/popclub/presentation/components";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export function UnExpiredRedeem() {
  const dispatch = useAppDispatch();
  const { hash } = useParams();

  const getLatestUnexpiredRedeemState = useAppSelector(
    selectGetLatestUnexpiredRedeem
  );

  useEffect(() => {
    dispatch(getLatestUnexpiredRedeem());
  }, [dispatch]);

  return (
    <>
      {getLatestUnexpiredRedeemState.data ? (
        <div
          className={`fixed z-[2003] bottom-[70px] sm:top-[80px] h-[90px] w-full ${
            hash === getLatestUnexpiredRedeemState.data.deal_hash
              ? "hidden"
              : ""
          }`}
        >
          <div className="container flex items-start justify-end h-full">
            <Link
              to={
                "/popclub/deal/" + getLatestUnexpiredRedeemState.data.deal_hash
              }
              className="text-white shadow-lg bg-secondary rounded-xl block h-full w-full sm:w-[400px]"
            >
              <div className="flex h-full">
                <div className="flex flex-col items-stretch flex-1">
                  <div className="flex-1 px-4 py-2 text-xs elipsis-3-line">
                    <span>{getLatestUnexpiredRedeemState.data.name}</span>
                  </div>
                  <div>
                    <CountdownTimerLatestRedeem />
                  </div>
                </div>
                <img
                  className="object-contain rounded-r-xl"
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${getLatestUnexpiredRedeemState.data.product_image}`}
                  alt="Deals"
                />
              </div>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
