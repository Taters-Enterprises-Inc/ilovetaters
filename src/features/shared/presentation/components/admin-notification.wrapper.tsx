import { Outlet } from "react-router-dom";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getAdminShopOrders } from "features/admin/presentation/slices/get-admin-shop-orders.slice";
import {
  GetAdminSessionState,
  selectGetAdminSession,
} from "features/admin/presentation/slices/get-admin-session.slice";
import { getAdminCateringBookings } from "features/admin/presentation/slices/get-admin-catering-bookings.slice";
import { getAdminPopclubRedeems } from "features/admin/presentation/slices/get-admin-popclub-redeems.slice";
import {
  pusher,
  REACT_APP_PUSHER_CLUSTER,
  REACT_APP_PUSHER_KEY,
} from "features/shared/constants";
import { getAdminNotifications } from "features/admin/presentation/slices/get-admin-notifications.slice";

interface TransactionParam {
  store_id: number;
  message: string;
}

export function AdminNotificationWrapper() {
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  useEffect(() => {
    const snackshopChannel = pusher.subscribe("snackshop");
    const cateringChannel = pusher.subscribe("catering");
    const popclubChannel = pusher.subscribe("popclub");

    snackshopChannel.bind("order-transaction", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.is_admin ||
        getAdminSessionState.data?.is_csr_admin ||
        getAdminSessionState.data?.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        toast("🦄 " + data.message);
        dispatch(getAdminShopOrders(""));
        dispatch(getAdminNotifications());
      }
    });

    cateringChannel.bind("booking-transaction", (data: TransactionParam) => {
      if (
        getAdminSessionState.data?.is_admin ||
        getAdminSessionState.data?.is_csr_admin ||
        getAdminSessionState.data?.user_details.stores.some(
          (store) => store.store_id === data.store_id
        )
      ) {
        toast("🦄 " + data.message);
        dispatch(getAdminCateringBookings(""));
        dispatch(getAdminNotifications());
      }
    });

    popclubChannel.bind(
      "popclub-store-visit-transaction",
      (data: TransactionParam) => {
        if (
          getAdminSessionState.data?.is_admin ||
          getAdminSessionState.data?.is_csr_admin ||
          getAdminSessionState.data?.user_details.stores.some(
            (store) => store.store_id === data.store_id
          )
        ) {
          toast("🦄 " + data.message);
          dispatch(getAdminPopclubRedeems(""));
          dispatch(getAdminNotifications());
        }
      }
    );
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={18000000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Outlet />
    </>
  );
}
