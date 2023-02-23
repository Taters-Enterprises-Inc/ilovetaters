import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { DealValidationState } from "features/popclub/presentation/components/deal";
import { getLatestUnexpiredRedeem } from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";
import {
  redeemDeal,
  RedeemDealState,
  resetRedeemDeal,
  selectRedeemDeal,
} from "features/popclub/presentation/slices/redeem-deal.slice";
import { selectRedeemValidators } from "features/popclub/presentation/slices/redeem-validators.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { getNotifications } from "features/shared/presentation/slices/get-notifications.slice";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { openLoginChooserModal } from "features/shared/presentation/slices/login-chooser-modal.slice";
import { SnackshopDealModel } from "features/shop/core/domain/snackshop-deal.model";
import moment from "moment";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { HiClock } from "react-icons/hi";
import { RiTimerFlashFill } from "react-icons/ri";
import { getSnackshopDeals } from "../slices/get-snackshop-deals.slice";

interface ShopDealCardProps {
  deal: SnackshopDealModel;
}

export function ShopDeal(props: ShopDealCardProps) {
  const dispatch = useAppDispatch();

  const getSessionState = useAppSelector(selectGetSession);
  const redeemDealState = useAppSelector(selectRedeemDeal);
  const redeemValidatorsState = useAppSelector(selectRedeemValidators);

  let availableStartTime;
  let availableEndTime;
  let availableStartTimeInDate: any;
  let dealValidationState: DealValidationState = DealValidationState.valid;

  let availableStartDateTime;
  let availableEndDateTime;
  let availableStartDateTimeInDate: any;

  function secondsToHms(d: any) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " min " : " mins ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second " : " seconds ") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  const pad = (number: number) => ("0" + number).slice(-2);

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      dispatch(getSnackshopDeals());
    } else {
      return (
        <span>
          <div className="flex items-center justify-center text-xs text-white lg:text-lg ">
            <div className="font-['Bebas_Neue'] tracking-[3px]">
              <span className="mr-2">
                {pad(days)}:{pad(hours)}:{pad(minutes)}:{pad(seconds)}
              </span>
            </div>
          </div>
        </span>
      );
    }
  };

  if (
    props.deal.available_start_datetime &&
    props.deal.available_end_datetime
  ) {
    const currentTime = moment();

    availableStartDateTime = moment(props.deal.available_start_datetime);
    availableEndDateTime = moment(props.deal.available_end_datetime);

    const isAvailable = currentTime.isBetween(
      availableStartDateTime,
      availableEndDateTime
    );

    if (isAvailable === false) {
      dealValidationState = DealValidationState.startAndEndDateTimeInvalid;
    }

    availableStartDateTimeInDate = availableStartDateTime.toDate();
  }

  if (props.deal.available_start_time && props.deal.available_end_time) {
    const currentTime = moment(moment().format("HH:mm:ss"), "HH:mm:ss");
    availableStartTime = moment(props.deal.available_start_time, "HH:mm:ss");
    availableEndTime = moment(props.deal.available_end_time, "HH:mm:ss");

    const isAvailable = currentTime.isBetween(
      availableStartTime,
      availableEndTime
    );

    if (isAvailable === false) {
      dealValidationState = DealValidationState.startAndEndTimeInvalid;
    }

    const currentDateStartingTime = moment().set({
      hour: availableStartTime.get("hour"),
      minute: availableStartTime.get("minute"),
      second: availableStartTime.get("second"),
    });

    const currentDateEndingTime = moment().set({
      hour: availableEndTime.get("hour"),
      minute: availableEndTime.get("minute"),
      second: availableEndTime.get("second"),
    });

    if (currentDateEndingTime.isBefore(moment())) {
      currentDateStartingTime.add(1, "day");
    }

    availableStartTimeInDate = currentDateStartingTime.toDate();
  }

  if (props.deal.available_days) {
    const DAYS = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const availableDays = props.deal.available_days;
    const currentDayOfWeek = DAYS[moment().weekday() - 1];

    const isAvailable = availableDays.includes(currentDayOfWeek);

    if (isAvailable === false) {
      dealValidationState = DealValidationState.availableListInvalid;
    }
  }

  if (redeemValidatorsState.data?.some((el) => el.deal_id === props.deal.id)) {
    dealValidationState = DealValidationState.redeemValidatorsInvalid;
  }

  useEffect(() => {
    if (redeemDealState.status === RedeemDealState.success) {
      dispatch(getNotifications());
      dispatch(getSession());
      dispatch(getLatestUnexpiredRedeem());
      dispatch(resetRedeemDeal());
    }
  }, [dispatch, redeemDealState]);

  const dealIsNotAvailableMessage = () => {
    switch (dealValidationState) {
      case DealValidationState.startAndEndDateTimeInvalid:
        return (
          <>
            <span className="text-xs font-bold lg:text-base">
              Available after
            </span>
            <Countdown
              renderer={renderer}
              date={availableStartDateTimeInDate}
            />
          </>
        );
      case DealValidationState.startAndEndTimeInvalid:
        return (
          <>
            <span className="text-xs font-bold lg:text-base">
              Available after
            </span>
            <Countdown renderer={renderer} date={availableStartTimeInDate} />
          </>
        );
      case DealValidationState.availableListInvalid:
        return (
          <span className="text-xs font-bold lg:text-base">
            Only available on Weekdays
          </span>
        );
      case DealValidationState.redeemValidatorsInvalid:
        if (redeemValidatorsState.data) {
          const redeemValidator = redeemValidatorsState.data.find(
            (o) => o.deal_id === props.deal.id
          );
          if (redeemValidator)
            return (
              <>
                <span className="text-xs font-bold lg:text-base">
                  Available after
                </span>
                <Countdown
                  renderer={renderer}
                  date={redeemValidator.next_available_redeem}
                />
              </>
            );
        }
        break;
      default:
        return null;
    }
  };

  const handleRedeem = () => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      dispatch(openLoginChooserModal({ required: false }));
      return;
    }
    dispatch(
      redeemDeal({
        hash: props.deal.hash,
        remarks: "",
      })
    );
  };

  return (
    <div className="relative flex">
      {dealValidationState === DealValidationState.valid ? null : (
        <div className="p-1 text-center not-available-overlay rounded-[10px] flex flex-col">
          {dealIsNotAvailableMessage()}
        </div>
      )}

      <img
        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${props.deal.product_image}`}
        className="rounded-[10px] w-[75px] h-[75px]"
        alt=""
      />
      <div className="flex flex-col flex-1 pt-2 pl-3 text-white">
        <h3 className="text-sm w-[90%] font-bold leading-4 pr-3">
          {props.deal.name}
        </h3>

        <h3 className="pr-3 text-xs">{props.deal.description}</h3>

        <div className="py-2 space-y-2">
          {props.deal.available_days ? (
            <div className="flex items-end space-x-2">
              <BsFillCalendar2WeekFill className="text-base text-white" />
              <span className="text-[9px] lg:text-xs text-white">
                Valid Weekdays
              </span>
            </div>
          ) : null}

          {availableStartTime && availableEndTime ? (
            <div className="flex items-center space-x-1">
              <HiClock className="text-base text-white" />
              <span className="text-[10px] lg:text-xs text-white">
                {availableStartTime.format("LT")} -{" "}
                {availableEndTime.format("LT")}
              </span>
            </div>
          ) : null}

          {availableStartDateTime && availableEndDateTime ? (
            <div className="flex items-center space-x-1">
              <HiClock className="text-base text-white" />
              <span className="text-[10px] lg:text-xs text-white">
                {availableStartDateTime.format("ll") ===
                availableEndDateTime.format("ll")
                  ? availableStartDateTime.format("ll")
                  : `
                    ${availableStartDateTime.format(
                      "ll"
                    )} - ${availableEndDateTime.format("ll")}`}
              </span>
            </div>
          ) : null}

          <div className="flex items-center space-x-1">
            <RiTimerFlashFill className="text-base text-white" />
            <span className="text-[9px] lg:text-xs text-white">
              {secondsToHms(props.deal.seconds_before_expiration)} claim time
            </span>
          </div>
        </div>

        {dealValidationState === DealValidationState.valid ? (
          <div className="flex items-center justify-end flex-1">
            <button
              onClick={handleRedeem}
              className="px-3 py-1 text-sm font-bold rounded-lg bg-button"
            >
              Redeem
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
