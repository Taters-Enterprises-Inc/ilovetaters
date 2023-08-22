import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Outlet } from "react-router-dom";
import { UnExpiredRedeem } from "../components/unexpired-redeem";
import "react-toastify/dist/ReactToastify.css";
import { SnackbarAlert } from "../components/snackbar-alert";
import { selectGetSession } from "../slices/get-session.slice";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { redeemValidators } from "features/popclub/presentation/slices/redeem-validators.slice";
import { getLatestUnexpiredRedeem } from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";
import {
  GetDealState,
  selectGetDeal,
} from "features/popclub/presentation/slices/get-deal.slice";
import { getRedeem } from "features/popclub/presentation/slices/get-redeem.slice";
import { ORDER_STATUS, pusher } from "features/shared/constants";
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
import { getNotifications } from "../slices/get-notifications.slice";

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
    pusher.unsubscribe("user-inbox");
    const inboxChannel = pusher.subscribe("user-inbox");

    inboxChannel.bind(
      "inbox-feedback-complete",
      (data: {
        fb_user_id?: number;
        mobile_user_id?: number;
        message: string;
      }) => {
        if (
          getSessionState.data?.userData.fb_user_id === data.fb_user_id ||
          getSessionState.data?.userData.mobile_user_id === data.mobile_user_id
        ) {
          showAlert(setSuccessAlert, data.message);

          dispatch(getNotifications());
        }
      }
    );
  }, [getSessionState, dispatch]);

  useEffect(() => {
    if (
      getCateringOrdersState.status === GetCateringOrdersState.success &&
      getCateringOrdersState.data
    ) {
      pusher.unsubscribe("user-catering");
      const cateringChannel = pusher.subscribe("user-catering");

      cateringChannel.bind(
        "catering-booking-changed",
        (data: {
          fb_user_id?: number;
          mobile_user_id?: number;
          message: string;
        }) => {
          if (
            getSessionState.data?.userData.fb_user_id === data.fb_user_id ||
            getSessionState.data?.userData.mobile_user_id ===
              data.mobile_user_id
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

      cateringChannel.bind(
        "catering-booking-updated",
        (data: {
          fb_user_id?: number;
          mobile_user_id?: number;
          message: string;
        }) => {
          if (
            getSessionState.data?.userData.fb_user_id === data.fb_user_id ||
            getSessionState.data?.userData.mobile_user_id ===
              data.mobile_user_id
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
  }, [getCateringOrdersState, getSessionState, dispatch]);

  useEffect(() => {
    if (
      getOrdersState.status === GetOrdersState.success &&
      getOrdersState.data
    ) {
      pusher.unsubscribe("user-snackshop");
      const snackshopChannel = pusher.subscribe("user-snackshop");

      snackshopChannel.bind(
        "snackshop-order-changed",
        (data: {
          fb_user_id?: number;
          mobile_user_id?: number;
          message: string;
        }) => {
          if (
            getSessionState.data?.userData.fb_user_id === data.fb_user_id ||
            getSessionState.data?.userData.mobile_user_id ===
              data.mobile_user_id
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
            getSessionState.data?.userData.fb_user_id === data.fb_user_id ||
            getSessionState.data?.userData.mobile_user_id ===
              data.mobile_user_id
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
  }, [getOrdersState, getSessionState, dispatch]);

  useEffect(() => {
    if (getDealState.status === GetDealState.success && getDealState.data) {
      pusher.unsubscribe("user-popclub");
      const popclubChannel = pusher.subscribe("user-popclub");

      popclubChannel.bind(
        "popclub-redeem-completed",
        (data: {
          fb_user_id?: number;
          mobile_user_id?: number;
          message: string;
        }) => {
          if (
            getSessionState.data?.userData.fb_user_id === data.fb_user_id ||
            getSessionState.data?.userData.mobile_user_id ===
              data.mobile_user_id
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
            getSessionState.data?.userData.fb_user_id === data.fb_user_id ||
            getSessionState.data?.userData.mobile_user_id ===
              data.mobile_user_id
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
  }, [getDealState, getSessionState, dispatch]);

  useEffect(() => {
    dispatch(getNotifications());
  }, [getCateringOrdersState, getOrdersState, dispatch]);

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
