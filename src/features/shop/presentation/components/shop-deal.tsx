import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { SnackshopDealModel } from "features/shop/core/domain/snackshop-deal.model";
import moment from "moment";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { HiClock } from "react-icons/hi";
import { RiTimerFlashFill } from "react-icons/ri";

interface ShopDealCardProps {
  deal: SnackshopDealModel;
}

export function ShopDeal(props: ShopDealCardProps) {
  let availableStartTime;
  let availableEndTime;

  let availableStartDateTime;
  let availableEndDateTime;

  if (props.deal.available_start_time && props.deal.available_end_time) {
    availableStartTime = moment(props.deal.available_start_time, "HH:mm:ss");
    availableEndTime = moment(props.deal.available_end_time, "HH:mm:ss");
  }
  if (
    props.deal.available_start_datetime &&
    props.deal.available_end_datetime
  ) {
    availableStartDateTime = moment(props.deal.available_start_datetime);
    availableEndDateTime = moment(props.deal.available_end_datetime);
  }

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

  return (
    <div className="relative flex">
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

        <div className="flex items-center justify-end flex-1">
          <button className="px-3 py-1 text-sm font-bold rounded-lg bg-button">
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
}
