import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  getDeal,
  GetDealState,
  resetGetDeal,
  selectGetDeal,
} from "../slices/get-deal.slice";
import {
  getDealProductVariants,
  GetDealProductVariantsState,
  resetGetDealProductVariantsState,
  selectGetDealProductVariants,
} from "../slices/get-deal-product-variants.slice";
import { VariantsChooserModal } from "../modals/variants-chooser.modal";
import { CountdownTimer } from "../components";
import {
  redeemDeal,
  RedeemDealState,
  selectRedeemDeal,
  resetRedeemDeal,
} from "../slices/redeem-deal.slice";
import {
  getRedeem,
  GetRedeemState,
  selectGetRedeem,
} from "../slices/get-redeem.slice";
import { resetGetRedeem } from "../slices/get-redeem.slice";
import Countdown from "react-countdown";
import { AiOutlineFieldTime } from "react-icons/ai";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import {
  FacebookLogoutState,
  resetFacebookLogout,
  selectFacebookLogout,
} from "features/shared/presentation/slices/facebook-logout.slice";
import {
  selectGetLatestUnexpiredRedeem,
  getLatestUnexpiredRedeem,
} from "../slices/get-latest-unexpired-redeem.slice";
import {
  forfeitRedeem,
  ForfeitRedeemState,
  resetForfeitRedeemStateStatus,
  selectForfeitRedeem,
} from "../slices/forfeit-redeem.slice";
import { MessageModal } from "features/shared/presentation/modals";
import {
  redeemValidators,
  selectRedeemValidators,
} from "../slices/redeem-validators.slice";
import moment from "moment";
import { StoreVisitDealStoreChooserModal } from "../modals/store-visit-deal-store-chooser.modal";
import { getNotifications } from "features/shared/presentation/slices/get-notifications.slice";
import ReactGA from "react-ga";
import { SnacksDeliveredDealStoreChooserModal } from "../modals/snacks-delivered-deal-store-chooser.modal";
import { openLoginChooserModal } from "features/shared/presentation/slices/login-chooser-modal.slice";
import {
  closeMessageModal,
  openMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";

export function PopClubDeal() {
  const query = useQuery();
  const getDealState = useAppSelector(selectGetDeal);
  const getDealProductVariantsState = useAppSelector(
    selectGetDealProductVariants
  );
  const redeemDealState = useAppSelector(selectRedeemDeal);
  const getRedeemState = useAppSelector(selectGetRedeem);
  const getLatestUnexpiredRedeemState = useAppSelector(
    selectGetLatestUnexpiredRedeem
  );
  const forfeitRedeemState = useAppSelector(selectForfeitRedeem);
  const redeemValidatorsState = useAppSelector(selectRedeemValidators);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  let { hash } = useParams();
  const referralCode = query.get("referral-code");

  const getSessionState = useAppSelector(selectGetSession);

  const [openVariantChooserModal, setOpenVariantChooserModal] = useState(false);

  const [
    openStoreVisitDealStoreChooserModal,
    setOpenStoreVisitDealStoreChooserModal,
  ] = useState(false);
  const [
    openSnacksDeliveredDealStoreChooserModal,
    setOpenSnacksDeliveredDealStoreChooserModal,
  ] = useState(false);

  const location = useLocation();
  const facebookLogoutState = useAppSelector(selectFacebookLogout);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (
      getDealState.status === GetDealState.success &&
      getDealProductVariantsState.status ===
        GetDealProductVariantsState.success &&
      getDealProductVariantsState.data
    ) {
      if (getDealProductVariantsState.data.length > 0) {
        setOpenVariantChooserModal(true);
      } else {
        if (getDealState.data?.hash) {
          dispatch(
            redeemDeal({
              hash: getDealState.data?.hash,
              remarks: "",
              referralCode: referralCode ?? "",
            })
          );
        }
      }
      dispatch(resetGetDealProductVariantsState());
    }
  }, [getDealProductVariantsState, navigate, getDealState, dispatch]);

  useEffect(() => {
    dispatch(resetGetRedeem());
    dispatch(getLatestUnexpiredRedeem());
    dispatch(redeemValidators());
  }, [dispatch]);

  useEffect(() => {
    if (
      getDealState.status === GetDealState.success &&
      getDealState.data &&
      forfeitRedeemState.status === ForfeitRedeemState.success
    ) {
      dispatch(
        getRedeem({
          deal_id: getDealState.data.id,
        })
      );
      dispatch(redeemValidators());
      dispatch(resetForfeitRedeemStateStatus());
    }
  }, [getDealState, forfeitRedeemState, dispatch]);

  useEffect(() => {
    if (
      getDealState.status === GetDealState.success &&
      getDealState.data &&
      redeemDealState.status === RedeemDealState.success
    ) {
      ReactGA.event({
        category: "PopClub Deals",
        action: "Redeem deals",
      });
      dispatch(getNotifications());
      dispatch(
        getRedeem({
          deal_id: getDealState.data.id,
        })
      );

      if (getDealState.data.platform_id === 2) {
        if (getDealState.data.deal_products_promo_include.length > 0) {
          const deal_products_promo_include =
            getDealState.data.deal_products_promo_include;

          if (
            deal_products_promo_include.length === 1 &&
            deal_products_promo_include[0].obtainable.length === 0
          ) {
            dispatch(getSession()).then(() => {
              navigate(
                "/delivery/products/" +
                  deal_products_promo_include[0].product_hash
              );
            });
          } else if (deal_products_promo_include[0].obtainable.length >= 1) {
            dispatch(getSession()).then(() => {
              navigate(
                "/delivery/products/" +
                  deal_products_promo_include[0].product_hash
              );
            });
          } else if (
            deal_products_promo_include[0].obtainable.length > 1 &&
            deal_products_promo_include.length > 1
          ) {
            dispatch(getSession()).then(() => {
              navigate("/delivery/products");
            });
          } else {
            dispatch(getSession()).then(() => {
              navigate("/delivery/products");
            });
          }
        } else if (
          getDealState.data.promo_discount_percentage ||
          getDealState.data.is_free_delivery
        ) {
          dispatch(getSession()).then(() => {
            navigate("/delivery/products");
          });
        } else if (
          getDealState.data.promo_price &&
          getDealState.data.original_price
        ) {
          dispatch(getSession()).then(() => {
            navigate("/delivery/checkout");
          });
        } else if (getDealState.data.subtotal_promo_discount) {
          navigate("/delivery/products");
        }
      }

      dispatch(resetRedeemDeal());
    }
  }, [redeemDealState, getDealState, forfeitRedeemState, dispatch, navigate]);

  useEffect(() => {
    if (facebookLogoutState.status === FacebookLogoutState.success) {
      navigate(
        `/popclub/${getSessionState.data?.popclub_data.platform}?category=all`
      );

      dispatch(resetFacebookLogout());
    }
  }, [facebookLogoutState, navigate, getSessionState, dispatch]);

  useEffect(() => {
    dispatch(getLatestUnexpiredRedeem());

    if (
      getDealState.status === GetDealState.success &&
      getDealState.data &&
      getRedeemState.status === GetRedeemState.initial
    ) {
      dispatch(
        getRedeem({
          deal_id: getDealState.data.id,
        })
      );
    }
  }, [getDealState, getRedeemState, dispatch]);

  useEffect(() => {
    if (hash) {
      dispatch(resetGetDeal());
      dispatch(getDeal(hash));
      dispatch(resetGetRedeem());
      dispatch(getLatestUnexpiredRedeem());
      dispatch(redeemValidators());
    }
  }, [hash, dispatch]);

  const handleRedeem = () => {
    if (hash) {
      dispatch(
        getDealProductVariants({
          hash,
        })
      );
    }
  };
  const goButtons = () => {
    if (
      getRedeemState.data &&
      getRedeemState.data.deal_products_promo_include.length > 0
    ) {
      const deal_products_promo_include =
        getRedeemState.data.deal_products_promo_include;

      if (deal_products_promo_include[0].obtainable.length > 0) {
        return (
          <button
            onClick={() => {
              navigate(
                "/delivery/products/" +
                  deal_products_promo_include[0].product_hash
              );
            }}
            className="w-full py-3 text-white uppercase border border-white bg-secondary rounded-xl"
          >
            Go Back to Product
          </button>
        );
      } else if (deal_products_promo_include.length === 1) {
        return (
          <button
            onClick={() => {
              navigate(
                "/delivery/products/" +
                  deal_products_promo_include[0].product_hash
              );
            }}
            className="w-full py-3 text-white uppercase border border-white bg-secondary rounded-xl"
          >
            Go Back to Product
          </button>
        );
      } else {
        return (
          <button
            onClick={() => {
              navigate("/delivery/products");
            }}
            className="w-full py-3 text-white uppercase border border-white bg-secondary rounded-xl"
          >
            Go Back to Products
          </button>
        );
      }
    } else if (
      getRedeemState.data &&
      (getRedeemState.data.promo_discount_percentage ||
        getRedeemState.data.is_free_delivery)
    ) {
      return (
        <button
          onClick={() => {
            navigate("/delivery/products");
          }}
          className="w-full py-3 text-white uppercase border border-white bg-secondary rounded-xl"
        >
          Go Back to Products
        </button>
      );
    } else if (
      getRedeemState.data &&
      getRedeemState.data.subtotal_promo_discount
    ) {
      return (
        <button
          onClick={() => {
            navigate("/delivery/products");
          }}
          className="w-full py-3 text-white uppercase border border-white bg-secondary rounded-xl"
        >
          Go Back to Products
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            navigate("/delivery/checkout");
          }}
          className="w-full py-3 text-white uppercase border border-white bg-secondary rounded-xl"
        >
          Go Back to Checkout
        </button>
      );
    }
  };

  const loginToRedeem = () => {
    dispatch(openLoginChooserModal({ required: false }));
  };

  const redeemButton = () => {
    let isAvailableStartDateTime = true;
    let availableStartDateTimeInDate: any;

    if (
      getDealState.data?.available_start_datetime &&
      getDealState.data?.available_end_datetime
    ) {
      const currentTime = moment();

      const availableStartDateTime = moment(
        getDealState.data?.available_start_datetime
      );
      const availableEndDateTime = moment(
        getDealState.data?.available_end_datetime
      );

      isAvailableStartDateTime = currentTime.isBetween(
        availableStartDateTime,
        availableEndDateTime
      );

      availableStartDateTimeInDate = availableStartDateTime.toDate();
    }

    if (
      getSessionState.data?.userData &&
      redeemValidatorsState.data &&
      redeemValidatorsState.data?.some(
        (o) => o.deal_id === getDealState.data?.id
      )
    ) {
      const redeemValidator = redeemValidatorsState.data.find(
        (o) => o.deal_id === getDealState.data?.id
      );

      const pad = (number: number) => ("0" + number).slice(-2);

      const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
          if (
            getDealState.status === GetDealState.success &&
            getDealState.data
          ) {
            dispatch(
              getRedeem({
                deal_id: getDealState.data.id,
              })
            );
          }
          dispatch(getLatestUnexpiredRedeem());
        } else if (!completed) {
          let timeName = "";

          if (days > 0) {
            if (days === 1) {
              timeName = "day";
            } else {
              timeName = "days";
            }
          } else if (hours > 0) {
            if (hours === 1) {
              timeName = "hour";
            } else {
              timeName = "hours";
            }
          } else if (minutes > 0) {
            if (minutes === 1) {
              timeName = "minute";
            } else {
              timeName = "minutes";
            }
          } else if (seconds > 0) {
            if (seconds === 1) {
              timeName = "second";
            } else {
              timeName = "seconds";
            }
          }

          return (
            <>
              <div className="flex items-center justify-center px-4 text-xl text-white ">
                <AiOutlineFieldTime className="mr-3 text-4xl" />
                <div className="font-['Bebas_Neue'] tracking-[4px]">
                  <span>
                    {pad(days)}:{pad(hours)}:{pad(minutes)}:{pad(seconds)}
                  </span>
                  <span className="ml-2 text-sm">{timeName}</span>
                </div>
              </div>
              <button
                className="w-full py-3 mt-4 font-bold text-black uppercase bg-white border border-white rounded-xl"
                onClick={() => {
                  navigate(
                    `/popclub/${getSessionState.data?.popclub_data.platform}?category=all`
                  );
                }}
              >
                Go Back
              </button>
            </>
          );
        }
      };

      if (redeemValidator)
        return (
          <div className="w-full py-3 text-white bg-secondary">
            <span className="mt-3">You can redeem this deal after </span>
            <Countdown
              renderer={renderer}
              date={moment(redeemValidator.next_available_redeem).toDate()}
            />
          </div>
        );
    } else if (!isAvailableStartDateTime) {
      const pad = (number: number) => ("0" + number).slice(-2);

      const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
          if (
            getDealState.status === GetDealState.success &&
            getDealState.data
          ) {
            dispatch(
              getRedeem({
                deal_id: getDealState.data.id,
              })
            );
          }
          dispatch(getLatestUnexpiredRedeem());
        } else if (!completed) {
          let timeName = "";

          if (days > 0) {
            if (days === 1) {
              timeName = "day";
            } else {
              timeName = "days";
            }
          } else if (hours > 0) {
            if (hours === 1) {
              timeName = "hour";
            } else {
              timeName = "hours";
            }
          } else if (minutes > 0) {
            if (minutes === 1) {
              timeName = "minute";
            } else {
              timeName = "minutes";
            }
          } else if (seconds > 0) {
            if (seconds === 1) {
              timeName = "second";
            } else {
              timeName = "seconds";
            }
          }

          return (
            <>
              <div className="flex items-center justify-center px-4 text-xl text-white ">
                <AiOutlineFieldTime className="mr-3 text-4xl" />
                <div className="font-['Bebas_Neue'] tracking-[4px]">
                  <span>
                    {pad(days)}:{pad(hours)}:{pad(minutes)}:{pad(seconds)}
                  </span>
                  <span className="ml-2 text-sm">{timeName}</span>
                </div>
              </div>
              <button
                className="w-full py-3 mt-4 font-bold text-black uppercase bg-white border border-white rounded-xl"
                onClick={() => {
                  navigate(
                    `/popclub/${getSessionState.data?.popclub_data.platform}?category=all`
                  );
                }}
              >
                Go Back
              </button>
            </>
          );
        }
      };

      return (
        <div className="w-full py-3 text-white bg-secondary">
          <span className="mt-3">You can redeem this deal after </span>
          <Countdown renderer={renderer} date={availableStartDateTimeInDate} />
        </div>
      );
    } else if (
      getSessionState.data?.userData &&
      getRedeemState.status === GetRedeemState.success &&
      getRedeemState.data
    ) {
      return (
        <>
          {getSessionState.data.popclub_data.platform === "online-delivery" ? (
            <>
              {goButtons()}
              <button
                className="w-full py-3 mt-4 font-bold text-white uppercase border border-white bg-primary rounded-xl"
                onClick={() => {
                  dispatch(
                    openMessageModal({
                      message:
                        "Are you sure you want to cancel the redemption?",
                      buttons: [
                        {
                          color: "#CC5801",
                          text: "Yes",
                          onClick: () => {
                            dispatch(forfeitRedeem());
                            dispatch(closeMessageModal());
                          },
                        },
                        {
                          color: "#22201A",
                          text: "No",
                          onClick: () => {
                            dispatch(closeMessageModal());
                          },
                        },
                      ],
                    })
                  );
                }}
              >
                Cancel Redeem
              </button>
              <button
                className="w-full py-3 mt-4 font-bold text-black uppercase bg-white border border-white rounded-xl"
                onClick={() => {
                  navigate(
                    `/popclub/${getSessionState.data?.popclub_data.platform}?category=all`
                  );
                }}
              >
                Go Back
              </button>
            </>
          ) : (
            <>
              <div className="w-full py-3 text-white uppercase bg-green-700 border border-white rounded-xl">
                CODE :
                <span className="ml-1 font-bold">
                  {getRedeemState.data.redeem_code}
                </span>
              </div>
              <button
                className="w-full py-3 mt-4 font-bold text-white uppercase border border-white bg-primary rounded-xl"
                onClick={() => {
                  dispatch(
                    openMessageModal({
                      message:
                        "Are you sure you want to cancel the redemption?",
                      buttons: [
                        {
                          color: "#CC5801",
                          text: "Yes",
                          onClick: () => {
                            dispatch(forfeitRedeem());
                            dispatch(closeMessageModal());
                          },
                        },
                        {
                          color: "#22201A",
                          text: "No",
                          onClick: () => {
                            dispatch(closeMessageModal());
                          },
                        },
                      ],
                    })
                  );
                }}
              >
                Cancel Redeem
              </button>
              <button
                className="w-full py-3 mt-4 font-bold text-black uppercase bg-white border border-white rounded-xl"
                onClick={() => {
                  navigate(
                    `/popclub/${getSessionState.data?.popclub_data.platform}?category=all`
                  );
                }}
              >
                Go Back
              </button>
            </>
          )}
        </>
      );
    } else if (
      getSessionState.data?.userData &&
      getLatestUnexpiredRedeemState.data?.deal_hash &&
      getLatestUnexpiredRedeemState.data?.deal_hash !== hash
    ) {
      return (
        <>
          <div className="w-full py-3 text-white uppercase border border-white bg-primary rounded-xl">
            You currently have running deal
          </div>
          <button
            className="w-full py-3 mt-4 font-bold text-black uppercase bg-white border border-white rounded-xl"
            onClick={() => {
              navigate(
                `/popclub/${getSessionState.data?.popclub_data.platform}?category=all`
              );
            }}
          >
            Go Back
          </button>
        </>
      );
    } else if (getSessionState.data?.userData === null) {
      return (
        <>
          <button
            className="bg-[#CC5801] font-bold text-white py-3 w-full uppercase border border-white rounded-xl"
            onClick={loginToRedeem}
          >
            Login to Redeem
          </button>
          <button
            className="w-full py-3 mt-4 font-bold text-black uppercase bg-white border border-white rounded-xl"
            onClick={() => {
              navigate(
                `/popclub/${getSessionState.data?.popclub_data.platform}?category=all`
              );
            }}
          >
            Go Back
          </button>
        </>
      );
    } else if (
      getSessionState.data?.popclub_data === null ||
      getSessionState.data?.cache_data === null ||
      (getDealState.data?.platform_id === 2 &&
        getSessionState.data?.customer_address === null)
    ) {
      return (
        <>
          <button
            className="bg-[#CC5801] font-bold text-white py-3 w-full uppercase border border-white rounded-xl"
            onClick={() => {
              switch (getDealState.data?.platform_id) {
                case 1:
                  setOpenStoreVisitDealStoreChooserModal(true);
                  break;
                case 2:
                  setOpenSnacksDeliveredDealStoreChooserModal(true);
                  break;
              }
            }}
          >
            Choose a store
          </button>
        </>
      );
    } else if (getSessionState.data?.userData) {
      return (
        <>
          <button
            className="w-full py-3 font-bold text-white uppercase border border-white bg-button rounded-xl"
            onClick={handleRedeem}
          >
            Redeem
          </button>
          <button
            className="w-full py-3 mt-4 font-bold text-black uppercase bg-white border border-white rounded-xl"
            onClick={() => {
              navigate(
                `/popclub/${getSessionState.data?.popclub_data.platform}?category=all`
              );
            }}
          >
            Go Back
          </button>
        </>
      );
    }
  };

  return (
    <>
      <section className="relative flex flex-col min-h-screen pb-10 bg-secondary">
        {getDealState.data ? (
          <>
            <div className="text-white text-center font-['Bebas_Neue'] tracking-[4px] text-xl">
              {getDealState.data.category_name}
            </div>

            <section className="mx-auto lg:w-[40%] flex-1 flex flex-col">
              <div className="relative flex flex-col flex-1 w-full pb-10 shadow-lg bg-secondary ">
                {getDealState.data.original_price &&
                getDealState.data.promo_price ? (
                  <div className="absolute top-0 left-0 flex flex-col items-start">
                    <div className=" text-[14px] bg-yellow-500 pl-2 pr-4 text-white rounded-r-[4px] mt-3 mb-[2px] font-bold">
                      {Math.floor(
                        ((parseFloat(getDealState.data.original_price) -
                          parseFloat(getDealState.data.promo_price)) /
                          parseFloat(getDealState.data.original_price)) *
                          100
                      )}
                      % OFF
                    </div>
                    <div className=" bg-red-500 pl-2 text-white rounded-r-[4px] pr-2 leading-5 py-[3px]">
                      <div className="text-left text-[14px] font-normal line-through mb-[1px]">
                        ₱{getDealState.data.original_price}
                      </div>
                      <span className="text-[28px] font-bold">
                        {" "}
                        ₱{getDealState.data.promo_price}
                      </span>
                    </div>
                  </div>
                ) : null}
                <img
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${getDealState.data.product_image}`}
                  alt={getDealState.data.name}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                  }}
                />
                <CountdownTimer />
                <div className="container flex-col pt-4 space-y-4 pb-36 lg:px-4">
                  <h1 className="text-white whitespace-pre-wrap font-['Bebas_Neue'] tracking-[3px] text-3xl ">
                    {getDealState.data.name}
                  </h1>
                  <h1 className="text-lg text-white whitespace-pre-wrap">
                    {getDealState.data.description}
                  </h1>

                  <div className="text-center">{redeemButton()}</div>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </section>

      {openVariantChooserModal ? (
        <VariantsChooserModal
          open={openVariantChooserModal}
          onClose={() => {
            setOpenVariantChooserModal(false);
          }}
        />
      ) : null}

      <StoreVisitDealStoreChooserModal
        open={openStoreVisitDealStoreChooserModal}
        onClose={() => {
          setOpenStoreVisitDealStoreChooserModal(false);
        }}
        onDefaultStoreSelectHandler={() => {
          if (hash) {
            dispatch(getDeal(hash));
          }
        }}
      />

      <SnacksDeliveredDealStoreChooserModal
        open={openSnacksDeliveredDealStoreChooserModal}
        onClose={() => {
          setOpenSnacksDeliveredDealStoreChooserModal(false);
        }}
        onDefaultStoreSelectHandler={() => {
          if (hash) {
            dispatch(getDeal(hash));
          }
        }}
      />
    </>
  );
}
