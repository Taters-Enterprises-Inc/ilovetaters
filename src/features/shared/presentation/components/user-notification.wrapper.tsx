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
  ADMIN_SNACKSHOP_ORDER_STATUS,
  ORDER_STATUS,
  REACT_APP_PUSHER_CLUSTER,
  REACT_APP_PUSHER_KEY,
} from "features/shared/constants";
import {
  getOrders,
  GetOrdersState,
  selectGetOrders,
} from "features/shop/presentation/slices/get-orders.slice";
import {
  getCateringOrders,
  GetCateringOrdersState,
  selectGetCateringOrders,
} from "features/catering/presentation/slices/get-catering-orders.slice";

export function UserNotificationWrapper() {
  const dispatch = useAppDispatch();
  const getSessionState = useAppSelector(selectGetSession);
  const getDealState = useAppSelector(selectGetDeal);
  const getOrdersState = useAppSelector(selectGetOrders);
  const getCateringOrdersState = useAppSelector(selectGetCateringOrders);

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
    if (
      getCateringOrdersState.status === GetCateringOrdersState.success &&
      getCateringOrdersState.data
    ) {
      const pusher = new Pusher(REACT_APP_PUSHER_KEY, {
        cluster: REACT_APP_PUSHER_CLUSTER,
      });

      const cateringChannel = pusher.subscribe("catering");

      cateringChannel.bind(
        "catering-booking-updated",
        (data: {
          fb_user_id?: number;
          mobile_user_id?: number;
          message: string;
        }) => {
          if (
            getSessionState.data?.userData.fb_user_id == data.fb_user_id ||
            getSessionState.data?.userData.mobile_user_id == data.mobile_user_id
          ) {
            showAlert(setSuccessAlert, data.message);

            if (
              getCateringOrdersState.status ===
                GetCateringOrdersState.success &&
              getCateringOrdersState.data
            ) {
              dispatch(
                getCateringOrders({
                  hash: getCateringOrdersState.data.order.clients_info.hash_key,
                })
              );
            }
          }
        }
      );
    }
  }, [getCateringOrdersState]);

  useEffect(() => {
    if (
      getOrdersState.status === GetOrdersState.success &&
      getOrdersState.data
    ) {
      const pusher = new Pusher(REACT_APP_PUSHER_KEY, {
        cluster: REACT_APP_PUSHER_CLUSTER,
      });

      const snackshopChannel = pusher.subscribe("snackshop");

      snackshopChannel.bind(
        "snackshop-order-changed",
        (data: {
          fb_user_id?: number;
          mobile_user_id?: number;
          message: string;
        }) => {
          if (
            getSessionState.data?.userData.fb_user_id == data.fb_user_id ||
            getSessionState.data?.userData.mobile_user_id == data.mobile_user_id
          ) {
            showAlert(setSuccessAlert, data.message);

            if (
              getOrdersState.status === GetOrdersState.success &&
              getOrdersState.data
            ) {
              dispatch(
                getOrders({
                  hash: getOrdersState.data.order.clients_info.hash_key,
                })
              );
            }
          }
        }
      );

      snackshopChannel.bind(
        "snackshop-order-update",
        (data: {
          fb_user_id?: number;
          mobile_user_id?: number;
          status: number;
        }) => {
          if (
            getSessionState.data?.userData.fb_user_id == data.fb_user_id ||
            getSessionState.data?.userData.mobile_user_id == data.mobile_user_id
          ) {
            showAlert(setSuccessAlert, ORDER_STATUS[data.status].name);

            if (
              getOrdersState.status === GetOrdersState.success &&
              getOrdersState.data
            ) {
              dispatch(
                getOrders({
                  hash: getOrdersState.data.order.clients_info.hash_key,
                })
              );
            }
          }
        }
      );
    }
  }, [getOrdersState]);

  useEffect(() => {
    if (getDealState.status === GetDealState.success && getDealState.data) {
      const pusher = new Pusher(REACT_APP_PUSHER_KEY, {
        cluster: REACT_APP_PUSHER_CLUSTER,
      });

      const popclubChannel = pusher.subscribe("popclub");

      popclubChannel.bind(
        "popclub-redeem-completed",
        (data: {
          fb_user_id?: number;
          mobile_user_id?: number;
          message: string;
        }) => {
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

      popclubChannel.bind(
        "popclub-redeem-declined",
        (data: {
          fb_user_id?: number;
          mobile_user_id?: number;
          message: string;
        }) => {
          if (
            getSessionState.data?.userData.fb_user_id == data.fb_user_id ||
            getSessionState.data?.userData.mobile_user_id == data.mobile_user_id
          ) {
            showAlert(setFailsAlert, data.message);
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
    }
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
