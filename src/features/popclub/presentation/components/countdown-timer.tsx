import moment from "moment";
import Countdown from "react-countdown";
import { ProgressBar } from "./progress-bar";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "features/config/hooks";

import { GetDealState, selectGetDeal } from "../slices/get-deal.slice";
import {
  getRedeem,
  GetRedeemState,
  selectGetRedeem,
} from "../slices/get-redeem.slice";

export function CountdownTimer() {
  const getRedeemState = useAppSelector(selectGetRedeem);
  const getDealState = useAppSelector(selectGetDeal);
  const dispatch = useAppDispatch();

  if (getRedeemState.status === GetRedeemState.success && getRedeemState.data) {
    var redeemDate: any = moment(getRedeemState.data.date_redeemed);
    var expirationDate: any = moment(getRedeemState.data.expiration);
    var expirationDateCountDown = moment(getRedeemState.data.expiration);

    const pad = (number: number) => ("0" + number).slice(-2);

    const renderer = ({ hours, minutes, seconds, completed }: any) => {
      if (completed) {
        if (getDealState.status === GetDealState.success && getDealState.data) {
          dispatch(
            getRedeem({
              deal_id: getDealState.data.id,
            })
          );
        }
      } else if (!completed) {
        var today = moment();
        let timeName = "";
        const percentage = Math.round(
          (1 - today.diff(redeemDate) / expirationDate.diff(redeemDate)) * 100
        );

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
          <>
            <ProgressBar percentage={percentage} />
            <div className="flex items-center px-4 text-xl text-white ">
              <AiOutlineFieldTime className="mr-2 text-4xl" />
              <div className="font-['Bebas_Neue'] tracking-[4px]">
                <span className="mr-2">
                  {pad(hours)}:{pad(minutes)}:{pad(seconds)}
                </span>
                <span className="text-sm">{timeName} Remaining</span>
              </div>
            </div>
          </>
        );
      }
    };

    return (
      <>
        <Countdown
          renderer={renderer}
          date={expirationDateCountDown.toDate()}
        />
      </>
    );
  }
  return null;
}
