import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getLatestUnexpiredRedeem,
  GetLatestUnexpiredRedeemState,
  selectGetLatestUnexpiredRedeem,
} from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";

import { useEffect, useState } from "react";
import { CountdownTimerLatestRedeem } from "features/popclub/presentation/components";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { getSession, selectGetSession } from "../slices/get-session.slice";
import { selectFacebookLogout } from "../slices/facebook-logout.slice";
import {
  ForfeitRedeemState,
  resetForfeitRedeemStateStatus,
  selectForfeitRedeem,
} from "features/popclub/presentation/slices/forfeit-redeem.slice";
import { IoMdClose } from "react-icons/io";
import { redeemValidators } from "features/popclub/presentation/slices/redeem-validators.slice";
import { selectSignInMobileUser } from "../slices/sign-in-mobile-user.slice";
import { TbArrowsMaximize } from "react-icons/tb";

export function UnExpiredRedeem() {
  const dispatch = useAppDispatch();
  const { hash } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const facebookLogoutState = useAppSelector(selectFacebookLogout);
  const getSessionState = useAppSelector(selectGetSession);
  const forfeitRedeemState = useAppSelector(selectForfeitRedeem);
  const signInMobileUserState = useAppSelector(selectSignInMobileUser);
  const getLatestUnexpiredRedeemState = useAppSelector(
    selectGetLatestUnexpiredRedeem
  );
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    if (forfeitRedeemState.status === ForfeitRedeemState.success) {
      dispatch(resetForfeitRedeemStateStatus());
    }
  }, [forfeitRedeemState, dispatch]);

  useEffect(() => {
    if (
      getLatestUnexpiredRedeemState.status ===
      GetLatestUnexpiredRedeemState.success
    ) {
      dispatch(getSession());
    }
  }, [dispatch, getLatestUnexpiredRedeemState]);

  useEffect(() => {
    dispatch(getLatestUnexpiredRedeem());
    dispatch(redeemValidators());
  }, [
    facebookLogoutState,
    dispatch,
    forfeitRedeemState,
    signInMobileUserState,
  ]);

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
              ? "sm:top-[100px] lg:top-[100px]"
              : "sm:top-[70px] lg:top-[80px]"
          } h-[90px] w-full ${
            hash === getLatestUnexpiredRedeemState.data.deal_hash
              ? "hidden"
              : ""
          }`}
        >
          <div className="container flex items-start justify-end h-1">
            <div className="text-white block w-full sm:w-[400px] h-1">
              <div className="flex items-start justify-start h-full">
                {showInfo ? (
                  <Link
                    to={
                      "/popclub/deal/" +
                      getLatestUnexpiredRedeemState.data.deal_hash
                    }
                    className="flex flex-col items-stretch flex-1 max-h-[75px] sm:max-h-fit min-h-[75px]  rounded-l-xl shadow-lg bg-secondary"
                  >
                    <div className="flex-1 h-full px-4 py-2 overflow-auto text-xs sm:overflow-hidden">
                      {getLatestUnexpiredRedeemState.data.remarks ? (
                        <>
                          <span
                            className="text-xs"
                            dangerouslySetInnerHTML={{
                              __html:
                                getLatestUnexpiredRedeemState.data.remarks,
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <span className="font-bold">
                            {getLatestUnexpiredRedeemState.data.name}
                          </span>

                          {getLatestUnexpiredRedeemState.data
                            .promo_discount_percentage ? (
                            <>
                              <br />
                              <span>
                                {getLatestUnexpiredRedeemState.data.description}
                              </span>
                            </>
                          ) : null}
                        </>
                      )}
                    </div>
                    <div>
                      <CountdownTimerLatestRedeem />
                    </div>
                  </Link>
                ) : (
                  <div className="flex flex-col items-stretch flex-1 "></div>
                )}
                <div className="relative">
                  <button
                    className="absolute top-0 right-0 z-20 p-1 text-sm text-white"
                    onClick={() => {
                      setShowInfo(!showInfo);
                    }}
                  >
                    {showInfo ? <IoMdClose /> : <TbArrowsMaximize />}
                  </button>
                  <button
                    onClick={() => {
                      if (showInfo === false) {
                        setShowInfo(true);
                      } else {
                        if (getLatestUnexpiredRedeemState.data) {
                          navigate(
                            "/popclub/deal/" +
                              getLatestUnexpiredRedeemState.data.deal_hash
                          );
                        }
                      }
                    }}
                  >
                    <img
                      className={`object-contain rounded-r-xl ${
                        showInfo ? "h-[75px] w-[75px]" : "h-[50px] w-[50px]"
                      } `}
                      src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${getLatestUnexpiredRedeemState.data.product_image}`}
                      alt={getLatestUnexpiredRedeemState.data.name}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                      }}
                    />
                    {showInfo ? null : <CountdownTimerLatestRedeem />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
