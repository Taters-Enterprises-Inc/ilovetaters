import { DealModel } from "features/popclub/core/domain/deal.model";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import moment from "moment";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { HiClock } from "react-icons/hi";
import { RiTimerFlashFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { AiOutlineFieldTime } from "react-icons/ai";

interface DealProps {
  deal: DealModel;
}

function secondsToHms(d: any) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second " : " seconds ") : "";
  return hDisplay + mDisplay + sDisplay;
}

const pad = (number: number) => ("0" + number).slice(-2);

const renderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
  } else {
    let timeName = "";

    if (hours > 0) {
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
      <span>
        <div className="flex items-center justify-center text-xs text-white lg:text-lg ">
          <div className="font-['Bebas_Neue'] tracking-[3px]">
            <span className="mr-2">
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
            <span className="text-xs lg:text-sm">{timeName}</span>
          </div>
        </div>
      </span>
    );
  }
};

export function Deal(props: DealProps) {
  const navigate = useNavigate();
  let availableStartTime;
  let availableEndTime;
  let availableStartTimeInDate;
  let isDealAvailable = true;

  if (props.deal.available_start_time && props.deal.available_end_time) {
    const currentTime = moment(moment().format("HH:mm:ss"), "HH:mm:ss");
    availableStartTime = moment(props.deal.available_start_time, "HH:mm:ss");
    availableEndTime = moment(props.deal.available_end_time, "HH:mm:ss");

    isDealAvailable = currentTime.isBetween(
      availableStartTime,
      availableEndTime
    );

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
    isDealAvailable = availableDays.includes(currentDayOfWeek);
  }

  const handleOnDealClick = () => {
    if (isDealAvailable) navigate(`/popclub/deal/${props.deal.hash}`);
  };

  return (
    <button onClick={handleOnDealClick}>
      <div
        className={`${
          isDealAvailable ? "" : "deal-not-available cursor-not-allowed"
        } relative flex flex-wrap flex-col bg-secondary shadow-md shadow-[#ffcd17] rounded-[10px] h-full`}
      >
        {isDealAvailable ? null : (
          <div className="p-1 text-center deal-not-available-text">
            {availableStartTimeInDate ? (
              <>
                <span className="text-xs font-bold lg:text-base">
                  Available after
                </span>
                <Countdown
                  renderer={renderer}
                  date={availableStartTimeInDate}
                />
              </>
            ) : null}
            {props.deal.available_days ? (
              <span>Only available on Weekdays</span>
            ) : null}
          </div>
        )}

        <h1 className="text-[12px] lg:text-lg pt-1 text-white uppercase font-['Bebas_Neue'] tracking-[2px] text-center ">
          {props.deal.category_name}
        </h1>
        {props.deal.original_price && props.deal.promo_price ? (
          <div className="absolute top-0 left-0 mt-9 lg:mt-12">
            <div
              className={`text-[11px] lg:text-[12px] mb-[2px] bg-yellow-500 text-white rounded-r-[2px] font-bold px-1`}
            >
              {Math.floor(
                ((props.deal.original_price - props.deal.promo_price) /
                  props.deal.original_price) *
                  100
              )}
              % OFF
            </div>
            <div className=" bg-red-500 text-white rounded-r-[4px] leading-[13px] lg:leading-[15px] px-1 py-[4px] lg:py-[6px]">
              <div className="text-left md:text-[12px] text-[11px] lg:text-[12px] font-normal line-through">
                ₱{props.deal.original_price}
              </div>
              <div className="text-[15px] lg:text-[20px] text-start">
                ₱{props.deal.promo_price}
              </div>
            </div>
          </div>
        ) : null}
        <img
          alt="..."
          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${props.deal.product_image}`}
          className="card-clickable h-[200px] lg:h-[350px] object-cover"
        />

        <div className="px-3 pt-4 pb-3 ">
          <div className="relative flex mb-2">
            <div className="fade-seperator"></div>
            <h4 className="text-white text-[11px] leading-4 lg:text-base font-semibold text-start text-sm whitespace-pre-wrap ">
              {props.deal.name}
            </h4>
          </div>
          <hr />
          {props.deal.available_days ? (
            <>
              <div className="flex items-center pt-2 space-x-2">
                <BsFillCalendar2WeekFill className="text-base text-white" />
                <span className="text-xs text-white">Weekdays</span>
              </div>
            </>
          ) : null}
          {availableStartTime && availableEndTime ? (
            <>
              <div className="flex items-center pt-2 space-x-1">
                <HiClock className="text-base text-white" />
                <span className="text-[10px] lg:text-xs text-white">
                  {availableStartTime.format("LT")} -{" "}
                  {availableEndTime.format("LT")}
                </span>
              </div>
            </>
          ) : null}

          <div className="flex items-center pt-2 space-x-1">
            <RiTimerFlashFill className="text-base text-white" />
            <span className="text-[10px] sm:text-xs text-white">
              {secondsToHms(props.deal.seconds_before_expiration)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}