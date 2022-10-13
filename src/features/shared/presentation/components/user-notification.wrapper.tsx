import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Outlet } from "react-router-dom";
import { UnExpiredRedeem } from "./unexpired-redeem";
import "react-toastify/dist/ReactToastify.css";
import { SnackbarAlert } from "./snackbar-alert";
import { GetSessionState, selectGetSession } from "../slices/get-session.slice";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Pusher from "pusher-js";
import { redeemValidators } from "features/popclub/presentation/slices/redeem-validators.slice";
import { getLatestUnexpiredRedeem } from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";
import {
  GetDealState,
  selectGetDeal,
} from "features/popclub/presentation/slices/get-deal.slice";
import { getRedeem } from "features/popclub/presentation/slices/get-redeem.slice";
import {
  REACT_APP_PUSHER_CLUSTER,
  REACT_APP_PUSHER_KEY,
} from "features/shared/constants";

interface TransactionParam {
  fb_user_id?: number;
  mobile_user_id?: number;
  message: string;
}

export function UserNotificationWrapper() {
  const dispatch = useAppDispatch();
  const getSessionState = useAppSelector(selectGetSession);
  const getDealState = useAppSelector(selectGetDeal);

  const [successAlert, setSuccessAlert] = useState<{
    status: boolean;
    message?: string;
  }>({
    status: false,
  });

  const [failsAlert, setFailsAlert] = useState<{
    status: boolean;
    message?: string;
  }>({
    status: false,
  });

  useEffect(() => {
    const pusher = new Pusher(REACT_APP_PUSHER_KEY, {
      cluster: REACT_APP_PUSHER_CLUSTER,
    });

    const popclubChannel = pusher.subscribe("popclub");

    popclubChannel.bind(
      "popclub-redeem-completed",
      (data: TransactionParam) => {
        if (
          getSessionState.data?.userData.fb_user_id == data.fb_user_id ||
          getSessionState.data?.userData.mobile_user_id == data.mobile_user_id
        ) {
          showAlert(setSuccessAlert, data.message);
          dispatch(getLatestUnexpiredRedeem());
          dispatch(redeemValidators());

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
        }
      }
    );

    popclubChannel.bind("popclub-redeem-declined", (data: TransactionParam) => {
      if (
        getSessionState.data?.userData.fb_user_id == data.fb_user_id ||
        getSessionState.data?.userData.mobile_user_id == data.mobile_user_id
      ) {
        showAlert(setFailsAlert, data.message);
        dispatch(getLatestUnexpiredRedeem());
        dispatch(redeemValidators());

        if (getDealState.status === GetDealState.success && getDealState.data) {
          dispatch(
            getRedeem({
              deal_id: getDealState.data.id,
            })
          );
        }
      }
    });
  }, [getDealState]);

  return (
    <>
      <Outlet />
      <UnExpiredRedeem />
      <SnackbarAlert
        open={successAlert.status}
        severity="success"
        message={successAlert.message}
      />
      <SnackbarAlert
        open={failsAlert.status}
        severity="error"
        message={failsAlert.message}
      />
    </>
  );
}

function showAlert(
  toggleStateAction: Dispatch<
    SetStateAction<{ status: boolean; message?: string | undefined }>
  >,
  message: string
) {
  toggleStateAction({
    status: true,
    message: message,
  });

  setTimeout(() => {
    toggleStateAction({
      status: false,
      message: message,
    });
  }, 3000);
}
