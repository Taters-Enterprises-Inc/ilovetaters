import { Link, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getLatestUnexpiredRedeem,
  selectGetLatestUnexpiredRedeem,
} from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";

import { useEffect, useState } from "react";
import { CountdownTimerLatestRedeem } from "features/popclub/presentation/components";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { getSession, selectGetSession } from "../slices/get-session.slice";
import { selectFacebookLogout } from "../slices/facebook-logout.slice";
import {
  forfeitRedeem,
  selectForfeitRedeem,
} from "features/popclub/presentation/slices/forfeit-redeem.slice";
import { IoMdClose } from "react-icons/io";
import { MessageModal } from "../modals";
import { redeemValidators } from "features/popclub/presentation/slices/redeem-validators.slice";

export function UnExpiredRedeem() {
  const dispatch = useAppDispatch();
  const { hash } = useParams();
  const location = useLocation();

  const facebookLogoutState = useAppSelector(selectFacebookLogout);
  const getSessionState = useAppSelector(selectGetSession);
  const forfeitRedeemState = useAppSelector(selectForfeitRedeem);

  const [openForfeitModalMessage, setOpenForfeitModalMessage] = useState(false);

  const getLatestUnexpiredRedeemState = useAppSelector(
    selectGetLatestUnexpiredRedeem
  );

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch, getLatestUnexpiredRedeemState]);

  useEffect(() => {
    dispatch(getLatestUnexpiredRedeem());
    dispatch(redeemValidators());
  }, [facebookLogoutState, dispatch, forfeitRedeemState]);

  return (
    <>
      {getLatestUnexpiredRedeemState.data ? (
        <div
          className={`fixed z-10  sm:h-1 bottom-[70px]  ${
            getSessionState.data &&
            getSessionState.data.cache_data &&
            getSessionState.data.customer_address &&
            getSessionState.data.cache_data.store_name &&
            !location.pathname.includes("popclub")
              ? "sm:top-[80px] lg:top-[100px]"
              : "sm:top-[70px] lg:top-[80px]"
          } h-[90px] w-full ${
            hash === getLatestUnexpiredRedeemState.data.deal_hash
              ? "hidden"
              : ""
          }`}
        >
          <div className="container flex items-start justify-end h-full">
            <div className="text-white block w-full sm:w-[400px]">
              <div className="flex items-start justify-start h-full">
                <Link
                  to={
                    "/popclub/deal/" +
                    getLatestUnexpiredRedeemState.data.deal_hash
                  }
                  className="flex flex-col items-stretch flex-1 max-h-[75px] sm:max-h-fit min-h-[75px]  rounded-l-xl shadow-lg bg-secondary"
                >
                  <div className="flex-1 h-full px-4 py-2 overflow-auto text-xs sm:overflow-hidden">
                    {getLatestUnexpiredRedeemState.data.remarks ? (
                      <span
                        className="font-bold"
                        dangerouslySetInnerHTML={{
                          __html: getLatestUnexpiredRedeemState.data.remarks,
                        }}
                      />
                    ) : (
                      <span className="font-bold">
                        {getLatestUnexpiredRedeemState.data.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <CountdownTimerLatestRedeem />
                  </div>
                </Link>
                <div className="relative">
                  <button
                    className="absolute top-0 right-0 z-20 p-1 text-sm text-white"
                    onClick={() => {
                      setOpenForfeitModalMessage(true);
                    }}
                  >
                    <IoMdClose />
                  </button>
                  <Link
                    to={
                      "/popclub/deal/" +
                      getLatestUnexpiredRedeemState.data.deal_hash
                    }
                  >
                    <img
                      className="object-contain rounded-r-xl h-[75px] w-[75px]"
                      src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${getLatestUnexpiredRedeemState.data.product_image}`}
                      alt="Deals"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <MessageModal
        open={openForfeitModalMessage}
        onClose={() => {
          setOpenForfeitModalMessage(false);
        }}
        onYes={() => {
          dispatch(forfeitRedeem());
          setOpenForfeitModalMessage(false);
        }}
        message={"Are you sure you want to cancel the redemption?"}
      />
    </>
  );
}
